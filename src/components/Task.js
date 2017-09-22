import React, { Component } from 'react'
import './Task.css'

class Task extends Component{

    handleOnDragStart = (evt) => {
        evt.dataTransfer.setData('task', JSON.stringify(this.props.task));
    }

    handleTaskRemove = (evt) => {
        this.props.removeTask(this.props.task)
    }

    render() {
        const { task } = this.props
        return (
            <div className="task" draggable="true" onDragStart={this.handleOnDragStart}>
                <span className="name">{ task.name }</span>
                <div className="remove" onClick={this.handleTaskRemove}><i className="fa fa-remove"></i></div>
            </div>
        )
    }
}

export default Task