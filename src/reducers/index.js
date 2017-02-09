import { combineReducers } from 'redux';

function cordBoxReducer(state = '', action = '') {
  switch (action.type) {
    case 'APP':
      //just return enumerable properties of passed objects
      return { ...state, action }
    default:
      return state
  }
}

export default combineReducers({
  cordBoxReducer
});
