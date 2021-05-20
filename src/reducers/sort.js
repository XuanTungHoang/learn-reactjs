import * as types from '../constants/ActionTypes'

var initialState = {
    sortType: "name",
    sortValue: 1
};
var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SORT:
            return action.sortData;
        default: return state;
    }
}

export default myReducer;