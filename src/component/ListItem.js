import React, { Component } from 'react';
import { FormControl, Button, ButtonGroup } from 'react-bootstrap';

export default class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: false,
            isEditing: false
        }
    }

    isEditing = (key) => {
        this.setState({ isEditing: true })
    }
    onClickCancel = () => {
        this.setState({ isEditing: false })
    }
    renderAction = (key) => {
        if (this.state.isEditing) {
            return (
                <tr key={key} style={{ textAlign: "center" }}>
                    <td>{this.props.todos.length + 1}</td>
                    <td><FormControl type="text" placeholder="Title" name="title" onChange={this.props.handleChange} value={this.props.title} /></td>
                    <td><FormControl type="text" placeholder="Description" name="description" onChange={this.props.handleChange} value={this.props.description} /></td>
                    <td><FormControl type="date" placeholder="Duadate" name="duadate" onChange={this.props.handleChange} value={this.props.duadate} /></td>
                    <td>
                        <ButtonGroup>
                            <Button bsStyle="primary" > &nbsp; SAVE &nbsp; </Button>
                            <Button bsStyle="danger" onClick={this.onClickCancel}>CANCEL</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        }
    }

    render() {
        return (
            <tbody>
                {this.props.todos.map((item, index) => {
                    return (
                        <tr key={item.key} style={{ textAlign: "center" }}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.duadate}</td>
                            <td>
                                <ButtonGroup>
                                    <Button bsStyle="primary" onClick={() => this.isEditing(item.key)}> &nbsp; EDIT &nbsp; </Button>
                                    <Button bsStyle="danger" onClick={() => this.props.onClick(item.key)}>DELETE</Button>
                                </ButtonGroup>
                            </td>

                        </tr>
                    )
                })}
            </tbody>
        )
    }
}
