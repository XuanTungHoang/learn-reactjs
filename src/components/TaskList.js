import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1,
    };
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onChangeFilterData({
      filterName: name === "filterName" ? value : this.state.filterName,
      filterStatus: name === "filterStatus" ? parseInt(value) : parseInt(this.state.filterStatus),
    });
    this.setState({
      [name]: value,
    });
  };

  render() {
    var { tasks, filterData, keyword, dataSort } = this.props; // var tasks = this.props.tasks
    var { filterName, filterStatus } = filterData;

    // filter by name and status
    if (filterName) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(filterName) !== -1;
      });
      tasks = tasks.filter((task) => {
        if (filterStatus === -1) {
          return task;
        } else {
          return task.status === (filterStatus === 1 ? true : false);
        }
      });
    } else {
      tasks = tasks.filter((task) => {
        if (filterStatus === -1) {
          return task;
        } else {
          return task.status === (filterStatus === 1 ? true : false);
        }
      });
    }

    // search by keywords
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }

    // sort data
    if (dataSort.sortType === "name") {
      tasks.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase())
          return dataSort.sortValue;
        else if (a.name.toLowerCase() < b.name.toLowerCase())
          return -dataSort.sortValue;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -dataSort.sortValue;
        else if (a.status < b.status) return dataSort.sortValue;
        else return 0;
      });
    }
    
    // render task
    var elmTasks = tasks.map((task, index) => {
      return <TaskItem key={task.id} index={index} task={task} />;
    });

    return (
      <table className="table table-bordered table-hover mt-15">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td />
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={filterName}
                onChange={this.onChange}
              />
            </td>
            <td>
              <select
                className="form-control"
                name="filterStatus"
                value={filterStatus}
                onChange={this.onChange}
              >
                <option value={-1}>Tất Cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích Hoạt</option>
              </select>
            </td>
            <td />
          </tr>
          {elmTasks}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    filterData: state.filterTable,
    keyword: state.search,
    dataSort: state.sort,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onChangeFilterData: (filterData) => {
      dispatch(actions.filterTaskInTable(filterData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
