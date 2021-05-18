import React, { Component } from "react";

class TaskForm extends Component {
  constructor (props){
    super(props);
    this.state = {
      id: '',
      name: '',
      status: true
    }
  }
  
  componentDidMount() {
    if(this.props.task){
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status
      });
    }
  }

  componentDidUpdate(preProps){
    if(!this.props.task && preProps.task){
      // console.log(preProps.task);
      this.setState({
        id: '',
        name: '',
        status: true
      });
    }else if (this.props.task !== preProps.task){
      // console.log(this.props.task);
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status
      });
    }
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onCancel();
    this.onCloseForm();
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  }

  onCancel = () => {
    this.setState({
      name: '',
      status: true
    })
  }

  render() {
    var {id} = this.state;
    return (
    <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">{id !== '' ? 'Sửa công việc' : 'Thêm Công Việc'}
            <span className="fa fa-times-circle text-right ml-10" onClick={this.onCloseForm}></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input type="text" className="form-control" name="name" value={this.state.name} onChange ={this.onChange} />
            </div>
            <label>Trạng Thái :</label>
            <select className="form-control" required="required" name="status" value={this.state.status} onChange ={this.onChange} >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                Lưu Lại
              </button>
              &nbsp;
              <button type="button" className="btn btn-danger" onClick={this.onCancel}>
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
    </div>
    );
  }
}

export default TaskForm;
