import React, { Component } from 'react';
import moment from 'moment'
import CreateTodo from './CreateTodo'
import { FormControl, ButtonGroup, Table, Button, Panel } from 'react-bootstrap';


export default class ShowList extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
            date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

        this.state = {
            date: date,
            isEditing: false,
            isEditingKey: 0

        }
    }
    isEditing = (key) => {
        
        console.log(key)
        this.setState({ isEditing: true, isEditingKey: key })
        this.props.onCancel()
    }

    onClickAddTodo = () => {
        this.props.addTodo(false)
        this.setState({ isEditing: false })
    }

    showAddButton = () => {
        if (!this.props.showButton) {
            return (
                <div align="center">
                    <Button type="button" bsClass="btn btn-success" onClick={this.onClickAddTodo}>

                        <span className="glyphicon glyphicon-plus-sign">&nbsp;</span>
                        ADD NEW TODO&nbsp;

                    </Button>
                </div>
            )
        }
    }
    onClickCancel = () => {
        this.setState({ isEditing: false })
        this.props.onCancel()
    }

    onSave = (key) => {
       
        this.props.onSave(key);
        this.setState({
            isEditing: false,
        })
    }

    showErrorTitle = (oldItem) => {
        const validation = /^[ก-๙ ]+$/;
        var item = this.props.title;
        var valid = validation.test(item)
            if (!valid && this.props.title !== undefined  && this.props.title !== '') {
                return (
                    <span style={{ color: "red" }} >กรอกภาษาไทยเท่านั้น</span>
                )
            }        
    }

    showErrorDescription = () => {
        const validation = /^[ก-๙ ]+$/;
        const item = this.props.description
        var valid = validation.test(item)
            if (!valid && this.props.description !== undefined  && this.props.description !== '') {
                return (
                    <span style={{ color: "red" }} >กรอกภาษาไทยเท่านั้น</span>
                )
            } 
    }

    showErrorDuadate = () => {
        var date1 = new Date(this.state.date);
        var date2 = new Date(this.props.duadate);
        const dateCheck = (date2 <= date1)
        if (dateCheck) {
            return (
                <span style={{ color: "red" }} >กรุณาเลือกวันที่มากกว่าปัจจุบัน</span>
            )
        }
    }

    saveValue = () => {
        var date1 = new Date(this.state.date);
        var date2 = new Date(this.props.duadate);
        const validation = /^[ก-๙ ]+$/;
        const {title,description,duadate} = this.props;
        var validTitle = validation.test(title);
        var validDescription = validation.test(description);
       if((title === '' || description === '' ) || (title && validTitle !== true) || (description && validDescription !== true) || date2 < date1){
           return true
       }else{
           return false
       }
            
    }

    renderTodos = () => {
        var date1 = new Date(this.state.date);
        var date2 = new Date(this.props.duadate);
        const validation = /^[ก-๙ ]+$/;
        const {title,description,duadate} = this.props;
        if (this.state.isEditing) {
            return (
                this.props.todos.map((item, index) => {
                    if (item.key === this.state.isEditingKey) {
                        
                        return (
                            <tr key={item.key} style={{ textAlign: "center" }}>
                                <td>{index + 1}</td>
                                <td><FormControl type="text" placeholder="Title" name="title" onChange={this.props.handleChange} defaultValue={item.title} />
                                    { this.showErrorTitle()}
                                </td>
                                <td>
                                    <FormControl type="text" placeholder="Description" name="description" onChange={this.props.handleChange} defaultValue={item.description} />
                                    {this.showErrorDescription()}
                                    </td>
                                <td>
                                    <FormControl type="date" placeholder="Duadate" name="duadate" onChange={this.props.handleChange} defaultValue={item.duadate} />
                                    {this.showErrorDuadate()}
                                    </td>
                                <td>
                                    <ButtonGroup>
                                        <Button bsStyle="info"
                                            onClick={() => this.onSave(item.key)}
                                            disabled={this.saveValue()}>
                                               
                                            <span className="glyphicon glyphicon-floppy-save"> SAVE</span>
                                        </Button>
                                        <Button bsStyle="warning" onClick={this.onClickCancel}>
                                            <span className="glyphicon glyphicon-remove"></span>&nbsp;
                                            CANCEL
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    } else {
                        const date = moment(item.duadate).format("DD/MM/YYYY");
                        return (
                            <tr key={item.key} style={{ textAlign: "center" }}>
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{date}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button bsStyle="primary" onClick={() => this.isEditing(item.key)}>
                                            <span className="glyphicon glyphicon-edit"> EDIT</span>
                                        </Button>
                                        <Button bsStyle="danger" onClick={() => this.props.onDelete(item.key)}>
                                            <span className="glyphicon glyphicon-trash"> DELETE</span>
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    }
                })
            )
        } else {
            return (
                this.props.todos.map((item, index) => {
                    const date = moment(item.duadate).format("DD/MM/YYYY");
                    return (
                        <tr key={item.key} style={{ textAlign: "center" }}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{date}</td>
                            <td>
                                <ButtonGroup>
                                    <Button bsStyle="primary" onClick={() => this.isEditing(item.key)}>
                                        <span className="glyphicon glyphicon-edit"> EDIT</span>
                                    </Button>
                                    <Button bsStyle="danger" onClick={() => this.props.onDelete(item.key)}>
                                        <span className="glyphicon glyphicon-trash"> DELETE</span>
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    )
                })
            )
        }
    }
    render() {
        return (
            <div className="container">
                <Panel bsStyle="info">
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr style={{ textAlign: "center", background: "#00bfff" }}>
                                <th style={{ width: "50px " }}>#</th>
                                <th style={{ width: "240px " }}>Title</th>
                                <th style={{ width: "240px " }}>Description</th>
                                <th style={{ width: "240px " }}>Duadate</th>
                                <th style={{ width: "240px " }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTodos()}
                        </tbody>
                        <CreateTodo todos={this.props.todos}
                            disableValue={this.disableValue}
                            showButton={this.props.showButton}
                            showForm={this.props.showForm}
                            onClickCancel={this.props.onCancel}
                            onClick={this.props.onClick}
                            handleChange={this.props.handleChange}
                            title={this.props.title}
                            description={this.props.description}
                            duadate={this.props.duadate}
                        />
                    </Table>
                </Panel>
                <div>{this.showAddButton()}</div>
            </div>
        )
    }
}
