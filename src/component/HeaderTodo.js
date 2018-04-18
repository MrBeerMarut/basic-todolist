import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

export default class HeaderTodo extends Component {
    render() {
        return (
            <div>
                <PageHeader align = "center">
                    Todo React App
                </PageHeader>      
            </div>
        )
    }
}
