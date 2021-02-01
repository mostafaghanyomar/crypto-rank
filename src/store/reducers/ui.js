import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { SECTION_1 } from "../actions";

const initialState = {
  requestsInitiated: 0,
  pageAlerts: [],
};

const requestSent = (state, action) => {
  const pageSection = action.pageSection !== null ? action.pageSection : SECTION_1;
  const pageAlerts =
    state.requestsInitiated === 0 && state.pageAlerts.length > 0
      ? state.pageAlerts.filter((al) => al.pageSection !== pageSection)
      : state.pageAlerts;
  return updateObject(state, {
    requestsInitiated: state.requestsInitiated + 1,
    pageAlerts: pageAlerts,
  });
};

const requestResolved = (state, action) => {
  return updateObject(state, {
    requestsInitiated: state.requestsInitiated - 1,
  });
};

const requestFailed = (state, action) => {
  return updateObject(state, {
    requestsInitiated: state.requestsInitiated - 1,
    pageAlerts: [
      ...state.pageAlerts,
      {
        id: Date.now(),
        message: action.message,
        alertType: action.alertType,
        showDuration: action.showDuration,
        pageSection: action.pageSection != null ? action.pageSection : SECTION_1,
      },
    ],
  });
};

const requestFailureAcknowledged = (state, action) => {
  return updateObject(state, {
    pageAlerts: state.pageAlerts.filter((err) => err.id !== action.id),
  });
};

const resetLoadingAndAlerts = (state, action) => {
  return updateObject(state, {
    requestsInitiated: 0,
    pageAlerts: [],
  });
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_SENT:
      return requestSent(state, action);
    case actionTypes.REQUEST_RESOLVED:
      return requestResolved(state, action);
    case actionTypes.REQUEST_FAILED:
      return requestFailed(state, action);
    case actionTypes.REQUEST_FAILURE_ACKNOWLEDGED:
      return requestFailureAcknowledged(state, action);
    case actionTypes.RESET_LOADING_AND_ALERTS:
      return resetLoadingAndAlerts(state, action);
    default:
      return state;
  }
};

export default uiReducer;
