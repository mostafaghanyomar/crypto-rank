import * as actionTypes from "./actionTypes";

export const requestSent = (pageSection) => {
  return {
    type: actionTypes.REQUEST_SENT,
    pageSection: pageSection
  };
};

export const requestResolved = () => {
    return {
        type: actionTypes.REQUEST_RESOLVED
    };
};

export const requestFailed = (message, alertType, duration, pageSection) => {
    return {
        type: actionTypes.REQUEST_FAILED,
        message: message,
        alertType: alertType,
        duration: duration,
        pageSection: pageSection
    };
};

export const requestFailureAcknowledged = (acknowledgedMessageId) => {
    return {
        type: actionTypes.REQUEST_FAILURE_ACKNOWLEDGED,
        id: acknowledgedMessageId
    };
};

export const resetLoadingAndAlerts = () => {
    return {
        type: actionTypes.RESET_LOADING_AND_ALERTS
    };
};