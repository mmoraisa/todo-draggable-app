import React, { Component } from 'react'
import './TaskList.css'
import Task from './Task'

class TaskList extends Component{

    handleDrop = (evt) => {
        evt.preventDefault();
        try {
            const task = JSON.parse(evt.dataTransfer.getData('task'));
            let taskListName = evt.target.dataset.taskListName;

            if(!evt.target.classList.contains('task-list')){
                taskListName = evt.target.closest('.task-list').dataset.taskListName
            }

            this.props.moveTask(task,taskListName)
        } catch (e) {
            return
        }
    }

    findAncestor = (el, cls) => {
        document.querySelector(el).closest(cls)
    }

    preventDefault = event => {
        event.preventDefault();
    }

    render() {
        const { column, removeTask } = this.props
        return (
            <div className="task-list" data-task-list-name={column.name} onDrop={this.handleDrop} onDragOver={this.preventDefault}>
                <h2>{column.name}</h2>
                { column.tasks.map(task => (
                    <Task key={task.id} task={task} removeTask={ removeTask }/>
                )) }
            </div>
        )
    }
}

export default TaskList