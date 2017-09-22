import React, { Component } from 'react'
import './ModalAddNewTask.css'

const initialState = {
    taskName: '',
    taskDescription: ''
}

class ModalAddNewTask extends Component{

    state = initialState

    handleTaskNameChange = e => {
        this.setState({
            taskName: e.target.value
        })
    }

    handleTaskDescriptionChange = e => {
        this.setState({
            taskDescription: e.target.value
        })
    }

    handleFormSubmit = e => {
        e.preventDefault();
        this.props.addNewTask(this.state);
        this.setState(initialState)
    }

    render() {
        const { visible, closeModal } = this.props
        const { taskName, taskDescription } = this.state
        return (
            <div className={'modal-add-new-task' + (visible ? ' visible ' : '')}>
                <div className="modal-header">
                    <h1>New Task</h1>
                    <a onClick={closeModal}>
                        <i className="fa fa-remove"></i>
                    </a>
                </div>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="newTaskName">Name:</label>
                        <input id="newTaskName" type="text" placeholder="New Task Name" onChange={this.handleTaskNameChange} value={taskName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newTaskDescription">Description:</label>
                        <textarea id="newTaskDescription" placeholder="New Task Description" onChange={this.handleTaskDescriptionChange} value={taskDescription}/>
                    </div>
                    <button type="submit"><i className="fa fa-save"></i>Save Task</button>
                </form>
            </div>
        )
    }
}

export default ModalAddNewTask