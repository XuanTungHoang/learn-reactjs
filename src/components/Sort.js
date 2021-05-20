import React, { Component } from "react";
import {connect} from 'react-redux';
import * as actions from './../actions/index';

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortData: {
        sortType: "name",
        sortValue: 1
      },
    };
  }

  onSorted = (sortType, sortValue) => {
    var sortData = {
      sortType: sortType,
      sortValue: sortValue
    }
    var currentDataSort = this.state.sortData
    var flag = currentDataSort.sortType === sortType && currentDataSort.sortValue === sortValue ? true : false;
    if(!flag && sortData){
      this.props.onSorted(sortData);
      this.setState({
        sortData: sortData
      });
    }
  }

  render() {
    var { sortData } = this.state;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li onClick={() => this.onSorted("name", 1)}>
              <a
                role="button"
                className={
                  sortData.sortType === "name" && sortData.sortValue === 1
                    ? "sort_selected"
                    : ""
                }
              >
                <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
              </a>
            </li>
            <li onClick={() => this.onSorted("name", -1)}>
              <a
                role="button"
                className={
                  sortData.sortType === "name" && sortData.sortValue === -1
                    ? "sort_selected"
                    : ""
                }
              >
                <span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
              </a>
            </li>
            <li role="separator" className="divider" />
            <li onClick={() => this.onSorted("status", 1)}>
              <a
                role="button"
                className={
                  sortData.sortType === "status" && sortData.sortValue === 1
                    ? "sort_selected"
                    : ""
                }
              >
                Trạng Thái Kích Hoạt
              </a>
            </li>
            <li onClick={() => this.onSorted("status", -1)}>
              <a
                role="button"
                className={
                  sortData.sortType === "status" && sortData.sortValue === -1
                    ? "sort_selected"
                    : ""
                }
              >
                Trạng Thái Ẩn
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSorted: (sortData) => {
      dispatch(actions.sortData(sortData));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Sort);