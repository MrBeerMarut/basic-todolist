import React from 'react';
import { Button, ButtonGroup, FormControl } from 'react-bootstrap';




export default class CreateTodo extends React.Component {
    constructor(props) {
        super(props);
        var today = new Date(),
            date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
        this.state = {
            date: date,
            valid: '',
        };
    }
    setValue = () => {
        this.setState({ valid: 'a' })
    }

    showErrorTitle = () => {
        const validation = /^[ก-๙]+$/;
        const item = this.props.title
        if (!item.match(validation) && this.props.title !== '') {
            return (
                <span style={{ color: "red" }} >กรอกภาษาไทยเท่านั้น</span>
            )
        }
    }

    showErrorDescription = () => {
        const validation = /^[ก-๙]+$/;
        const item = this.props.description
        if (!item.match(validation) && this.props.description !== '') {
            return (
                <span style={{ color: "red" }} >กรอกภาษาไทยเท่านั้น</span>
            )
        }
    }

    showErrorDuadate = () => {
        var date1 = new Date(this.state.date);
        var date2 = new Date(this.props.duadate);
        console.log(date1)
        const dateCheck = (date2 <= date1)
        if (dateCheck) {
            return (
                <span style={{ color: "red" }} >กรุณาเลือกวันที่มากกว่าปัจจุบัน</span>
            )
        }
    }
    renderForm = () => {
        var date1 = new Date(this.state.date);
        var date2 = new Date(this.props.duadate);
        const validation = /^[ก-๙]+$/;
        const { title, description, duadate } = this.props;
        if (this.props.showForm) {
            return (

                <tr style={{ textAlign: "center" }}>
                    <td>{this.props.todos.length + 1}</td>
                    <td>
                        <FormControl type="text" placeholder="Title" name="title" onChange={this.props.handleChange} value={this.props.title} />
                        {this.showErrorTitle()}
                    </td>
                    <td><FormControl type="text" placeholder="Description" name="description" onChange={this.props.handleChange} value={this.props.description} />
                        {this.showErrorDescription()}
                    </td>
                    <td><FormControl type="date" placeholder="01-01-2018" name="duadate" onChange={this.props.handleChange} value={this.props.duadate} />
                        {this.showErrorDuadate()}
                    </td>
                    <td>
                        <ButtonGroup>
                            <Button bsStyle="success"
                                onClick={this.props.onClick}
                                disabled={title === '' ||
                                    description === '' ||
                                    duadate === '' ||
                                    !title.match(validation) ||
                                    !description.match(validation) ||
                                    date2 <= date1} >
                                <span className="glyphicon glyphicon-upload"></span>
                                &nbsp;ADD
                                </Button>
                            <Button bsStyle="warning" onClick={this.props.onClickCancel}>
                                <span className="glyphicon glyphicon-remove"></span>&nbsp;
                                CANCEL</Button>
                        </ButtonGroup>
                    </td>
                </tr>

            )
        }
    }

    render() {
        return (
            <tbody>
                {this.renderForm()}
            </tbody>
        )
    }
}


