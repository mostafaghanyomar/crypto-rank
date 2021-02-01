import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  data: [],
};

const setData = (state, action) => {
  return updateObject(state, {
    data: action.data,
  });
};

const resetData = (state, action) => {
  return updateObject(state, {
    data: [],
  });
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return setData(state, action);
    case actionTypes.RESET_DATA:
      return resetData(state, action);
    default:
      return state;
  }
};

export default uiReducer;
