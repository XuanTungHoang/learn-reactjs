import "./App.css";
import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import SearchAndSort from "./components/SearchAndSort";
import TaskList from "./components/TaskList";

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      tasks : [],
      isDisplayForm: false,
      taskEditing: []
    }
  }

  componentDidMount(){
    if(localStorage && localStorage.getItem('tasks')){
      this.setState({
        tasks: JSON.parse(localStorage.getItem('tasks'))
      });
    }
  }

  onTogleForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm
    });
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }

  onSubmit = (data) => {
    var {tasks} = this.state;
    if(data.id === ''){
      data.id = this.generateID();
      tasks.push(data);
    }else {
      tasks.forEach((task,index) => {
        if(task.id === data.id){
          tasks[index] = data;
        }
      });
    }
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }

  randomString() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID() {
    return this.randomString() + '-' + this.randomString() + '-' + 
    this.randomString() + '-' + this.randomString() + '-' + this.randomString();
  }

  onUpdateStatus = (id) => {
    var {tasks} = this.state;
    tasks.forEach((task,index) => {
      if(task.id === id){
        task.status = !task.status;
      }
    });
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  onDelete = (id) => {
    var {tasks} = this.state;
    tasks.forEach((task, index) => {
      if(task.id === id){
        tasks.splice(index, 1);
      }
    });
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    this.onCloseForm();
  }

  onEditTask = (id) => {
    var {tasks} = this.state;
    tasks.forEach((task, index) => {
      if(task.id === id){
        var taskEditing = tasks[index];
        this.setState({
          taskEditing: taskEditing,        
        });
       // console.log(this.state.taskEditing);
      }
    });
    this.onShowForm();
    
  }

  render() {

    var {tasks, isDisplayForm, taskEditing} = this.state // var tasks = this.state.tasks
    var elmForm = isDisplayForm ? <TaskForm onSubmit={this.onSubmit} onCloseForm={this.onCloseForm} task={taskEditing} /> : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            {elmForm}
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="button" className={isDisplayForm ? 'btn btn-primary disabled' : 'btn btn-primary'} onClick={this.onTogleForm}>
              <span className="fa fa-plus mr-5" />
              Thêm Công Việc
            </button>
            <SearchAndSort />
            <TaskList tasks = {tasks} onUpdateStatus={this.onUpdateStatus} onDelete={this.onDelete} onEditTask={this.onEditTask} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
