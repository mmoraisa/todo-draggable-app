import React, { Component } from 'react'
import TaskList from './TaskList'
import ModalAddNewTask from './ModalAddNewTask'
import './App.css'

const columnsNames = ['To Do', 'In Progress', 'Done'];

class App extends Component {

  state = {
    tasks: [],
    modalAddNewTaskVisible: false
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
      modalAddNewTaskVisible: true
    })
  }

  addNewTask = task => {
    this.setState(prev => {
      const { tasks } = prev
      tasks.push({
        id: tasks.length + 1,
        name: task.taskName,
        description: task.taskDescription,
        status: 'To Do'
      })
      this.updateLocalStorageTasks(tasks)
      return { tasks, modalAddNewTaskVisible: false }
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
    const { tasks, modalAddNewTaskVisible } = this.state;
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
            <TaskList moveTask={this.moveTask} key={column.name} column={column} />
          ))}
        </section>
        <ModalAddNewTask addNewTask={this.addNewTask} visible={modalAddNewTaskVisible} closeModal={this.closeModalAddNewTask}/>
      </div>
    );
  }
}

export default App;
