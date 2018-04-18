import React, { Component } from 'react';
import HeaderTodo from './HeaderTodo';
import ShowList from './ShowList'
import moment from 'moment'



export default class App extends Component {
  constructor(props) {
    super(props);

    var today = new Date(),
      date = today.getFullYear() + (today.getMonth() + 1) + today.getDate();

    this.state = {
      date: date,
      showForm: false,
      showButton: false,
      title: undefined,
      description: undefined,
      duadate: '2017-08-13',
      key: 0,
      count: 3,
      todos: [
        { title: 'เดิน', description: 'เดินไปซื้อของ', duadate: '2018-03-29', key: 0 },
        { title: 'นั่ง', description: 'นั่งวินมอไซต์', duadate: '2018-03-30', key: 1 },
        { title: 'วิ่ง', description: 'วิ่งออกกำลังกาย', duadate: '2018-03-31', key: 2 }
      ]
    }
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onClickAddTodo = () => {
    this.setState({
      title: '',
      description: '',
      duadate: '',
      showForm: true,
      showButton: true
    })
  }

  onCancel = () => {
    console.log("cancel")
    this.setState({
      showForm: false,
      showButton: false,
      title: undefined,
      description: undefined,
      duadate: undefined,
    })
  }

  handleDelete = (keyToDelete) => {
    console.log(keyToDelete);
    const todos = this.state.todos;
    const newTodos = todos.filter((item, i) => item.key !== keyToDelete);
    this.setState({ todos: newTodos });
  }

  onSave = async (keyToSave) => {
    if ((this.state.title !== undefined) || (this.state.description !== undefined) || (this.state.duadate !== undefined)) {
      await this.setState({
        todos: this.state.todos.map(
          (item, i) => item.key === keyToSave ?
            {
              title: this.state.title === undefined ? item.title : this.state.title,
              description: this.state.description === undefined ? item.description : this.state.description,
              duadate: this.state.duadate === undefined ? item.duadate : this.state.duadate,
              key: keyToSave
            }
            : item),
        title: undefined,
        description: undefined,
        duadate: undefined,
      }, () => console.log(this.state))

    } else {
      this.setState({
        showForm: false,
        showButton: false,
      });
    }
  }

  handleClickAdd = () => {
    console.log(moment(this.state.duadate).format("DD/MM/YYYY"))
    var date1 = new Date(this.state.date);
    var date2 = new Date(this.props.duadate);
    const dateCheck = (date2 <= date1)
    if (!dateCheck) {
      const newItems = {
        title: this.state.title,
        description: this.state.description,
        duadate: this.state.duadate,
        key: this.state.count
      }
      console.log(newItems)
      this.setState({
        todos: [...this.state.todos, newItems],
        count: this.state.count + 1,
        title: undefined,
        description: undefined,
        duadate: undefined,
        showForm: false,
        showButton: false
      })
    }
  }

  render() {
    return (
      <div>
        <HeaderTodo />
        <ShowList todos={this.state.todos}
          onSave={this.onSave}
          onClick={this.handleClickAdd}
          onDelete={this.handleDelete}
          showForm={this.state.showForm}
          showButton={this.state.showButton}
          addTodo={this.onClickAddTodo}
          onCancel={this.onCancel}
          handleChange={this.handleChange}
          title={this.state.title}
          description={this.state.description}
          duadate={this.state.duadate}
        />

        

      
    
      </div>
    );
  }
}

