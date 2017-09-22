import React, { Component } from 'react'
import TaskList from './TaskList'
import ModalAddOrEditTask from './ModalAddOrEditTask'
import './App.css'

const columnsNames = ['To Do', 'In Progress', 'Done'];

class App extends Component {

  state = {
    tasks: [],
    modalAddNewTaskVisible: false,
    currentEditingTask: {
      id: null,
      name: '',
      description: '',
      status: columnsNames[0]
    }
  };

  handleBackdropClick = () => {
    this.setState({
      modalAddNewTaskVisible: false
    })
  }
  
  closeModalAddNewTask = () => {
    this.setState({
      modalAddNewTaskVisible: false
    })
  }
  
  openModalAddNewTask = () => {
    this.setState({
      modalAddNewTaskVisible: true,
      currentEditingTask: {
        id: null,
        name: '',
        description: '',
        status: columnsNames[0]
      }
    })
  }
  
  openModalEditTask = task => {
    this.setState({
      modalAddNewTaskVisible: true,
      currentEditingTask: task
    })
  }

  addNewTask = task => {
    this.setState(prev => {
      const { tasks } = prev
      tasks.push({
        id: tasks.length + 1 + '_' + Math.random().toString(36).substr(-8),
        name: task.name,
        description: task.description,
        status: task.status
      })
      this.updateLocalStorageTasks(tasks)
      return { tasks, modalAddNewTaskVisible: false }
    })
  }

  saveTask = task => {
    this.setState(prev => {
      const { tasks } = prev
      const newTasks = tasks.filter(_ => _.id !== task.id).concat([ task ])
      this.updateLocalStorageTasks(newTasks)
      return { tasks: newTasks, modalAddNewTaskVisible: false }
    })
  }

  removeTask = task => {
    this.setState(prev => {
      const { tasks } = prev
      const newTasks = tasks.filter(_ => _.id !== task.id)
      this.updateLocalStorageTasks(newTasks)
      return { tasks: newTasks }
    })
  }

  moveTask = (task,taskListName) => {
    task.status = taskListName;
    this.setState(prev => {
      const { tasks } = prev
      const newTasks = tasks.filter(_ => _.id !== task.id).concat([ task ])
      this.updateLocalStorageTasks(newTasks)
      return { tasks: newTasks }
    })
  }

  updateLocalStorageTasks = tasks => {
    window.localStorage.setItem('toDoApp_Tasks',JSON.stringify(tasks))
  }

  componentWillMount() {
    this.setState({
      tasks: JSON.parse(window.localStorage.getItem('toDoApp_Tasks') || '[]')
    })
  }

  render() {
    const { tasks, modalAddNewTaskVisible, currentEditingTask } = this.state;

    const columns = columnsNames.map(column => ({
      name: column,
      tasks: tasks.filter(_ => _.status === column)
    }));

    return (
      <div className="App">
        {this.state.modalAddNewTaskVisible && (<div className="backdrop" onClick={this.handleBackdropClick}></div>)}
        <section className="app-header">
          <h1>ToDo App</h1>
          <div className="open-modal-add-new-task" onClick={this.openModalAddNewTask}>
            <i className="fa fa-plus"></i>
          </div>
        </section>
        <section className="app-content">
          {columns.map(column => (
            <TaskList moveTask={this.moveTask} openModalEditTask={this.openModalEditTask} removeTask={this.removeTask} key={column.name} column={column} />
          ))}
        </section>
        <ModalAddOrEditTask task={currentEditingTask} saveTask={this.saveTask} addNewTask={this.addNewTask} visible={modalAddNewTaskVisible} closeModal={this.closeModalAddNewTask}/>
      </div>
    );
  }
}

export default App;
