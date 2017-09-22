import React, { Component } from 'react'
import './ModalAddOrEditTask.css'

const initialState = {
    name: '',
    description: '',
    task: {}
}

class ModalAddOrEditTask extends Component{

    state = initialState

    componentWillReceiveProps = (props) => {
        const { task } = props
        this.setState({
            name: task.name,
            description: task.description,
            task: task
        })
    }

    handleTaskNameChange = e => {
        this.setState({
            name: e.target.value
        })
    }

    handleTaskDescriptionChange = e => {
        this.setState({
            description: e.target.value
        })
    }

    handleFormSubmit = e => {
        e.preventDefault();

        const { name, description, task } = this.state
        task.name = name;
        task.description = description;

        if(task.id)
            this.props.saveTask(task);
        else
            this.props.addNewTask(task);
        
        this.setState(initialState)
    }

    render() {
        const { visible, closeModal } = this.props
        const { name, description } = this.state

        return (
            <div className={'modal-add-or-edit-task' + (visible ? ' visible ' : '')}>
                <div className="modal-header">
                    <h1>{ this.state.task.id ? 'Edit Task' : 'New Task' }</h1>
                    <a onClick={closeModal}>
                        <i className="fa fa-remove"></i>
                    </a>
                </div>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input id="name" type="text" placeholder="New Task Name" onChange={this.handleTaskNameChange} value={name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" placeholder="New Task Description" onChange={this.handleTaskDescriptionChange} value={description}/>
                    </div>
                    <button type="submit"><i className="fa fa-save"></i>Save Task</button>
                </form>
            </div>
        )
    }
}

export default ModalAddOrEditTask