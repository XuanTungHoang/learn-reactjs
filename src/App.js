import "./App.css";
import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import SearchAndSort from "./components/SearchAndSort";
import TaskList from "./components/TaskList";
import {connect} from 'react-redux';
import * as actions from './actions/index';

class App extends Component {

  onToggleForm = () => {
    var {itemEditing} = this.props;
    if(itemEditing.id !== ''){
      this.props.onOpenForm();
    }else{
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id: '',
      name: '',
      status: true
    });
  }

  render() {
    var {isDisplayForm} = this.props;
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            <TaskForm/>
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5" />
              Thêm Công Việc
            </button>
            <SearchAndSort />
            <TaskList />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.editTask 
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },

    onClearTask: (task) => {
      dispatch(actions.editTask(task));
    },

    onOpenForm: () => {
      dispatch(actions.openForm());
    },
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
