import * as actionTypes from "./actionTypes";

export const setLoadedNotifications = (payload) => {
  return {
    type: actionTypes.SET_LOADED_NOTIFICATIONS,
    payload: payload,
  };
};

export const setReloadNotifications = () => {
  return {
    type: actionTypes.SET_RELOAD_NOTIFICATIONS,
  };
};