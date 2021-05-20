import * as types from './../constants/ActionTypes'

var randomString = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

var generateID = () => {
    return randomString() + '-' + randomString() + '-' + 
    randomString() + '-' + randomString() + '-' + randomString();
  }

var currentTasks = JSON.parse(localStorage.getItem('tasks'));
var initialState = currentTasks ? currentTasks : [];
var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.ALL_TASK:
            return state;
        case types.SAVE_TASK:
            var newTask = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status === 'false' ? false : true
            }
            if(!newTask.id){
                newTask.id = generateID();
                state.push(newTask);
            }else{
                state.forEach((elm, index) => {
                    if(elm.id === action.task.id){
                        state[index] = newTask;
                    }
                });
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS:
            var id = action.id;
            state.forEach((elm, index) => {
                if(elm.id === id){
                    // state[index] = {
                    //     ...state[index],
                    //     status: !state[index].status
                    // };
                    var tmpTask = {...state[index]};
                    tmpTask.status = !tmpTask.status;
                    state[index] = tmpTask;
                    localStorage.setItem('tasks' , JSON.stringify(state));
                }
            });
            return [...state];
        case types.DELETE_TASK:
            var id = action.id;
            state.forEach((elm, index) => {
                if(elm.id === id){
                    state.splice(index,1);
                    localStorage.setItem('tasks' , JSON.stringify(state));
                }
            });
            return [...state];
        default: return state;
    }
}

export default myReducer;