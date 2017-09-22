import React, { Component } from 'react'
import './Task.css'

class Task extends Component{

    handleOnDragStart = (evt) => {
        evt.dataTransfer.setData('task', JSON.stringify(this.props.task));
    }

    render() {
        const { task } = this.props
        return (
            <div className="task" draggable="true" onDragStart={this.handleOnDragStart}>{ task.name }</div>
        )
    }
}

export default Task