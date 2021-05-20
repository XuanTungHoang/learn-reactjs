import * as types from '../constants/ActionTypes'

var initialState = {
    filterName: '',
    filterStatus: -1
};
var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.FILTER_TABLE:
            return action.filterData;
        default: return state;
    }
}

export default myReducer;