import "./App.css";
import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import SearchAndSort from "./components/SearchAndSort";
import TaskList from "./components/TaskList";
import {connect} from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1,
      keyword: '',
      dataSort: {
        sortType: 'name',
        sortValue: 1
      }
    }
  }

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

  onFilter = (data) => {
   if(data){
    this.setState({
      filterName: data.filterName.toLowerCase(),
      filterStatus: data.filterStatus
    });
   }
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword.toLowerCase()
    })
  }

  onSorted = (dataSort) => {
   
    var currentDataSort = this.state.dataSort
    var flag = currentDataSort.sortType === dataSort.sortType && currentDataSort.sortValue === dataSort.sortValue ? true : false;
    if(!flag){
      this.setState({
        dataSort: {
          sortType: dataSort.sortType,
          sortValue: dataSort.sortValue
        }
      });
    }
  }

  render() {
    var {taskEditing, filterName, filterStatus, keyword, dataSort} = this.state // var tasks = this.state.tasks
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
            <SearchAndSort onSearch={this.onSearch} onSorted={this.onSorted} />
            <TaskList onFilter={this.onFilter} />
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
