import * as actionTypes from "./actionTypes";
import axios from "axios";

export const setLocation = (payload) => {
  return {
    type: actionTypes.SET_LOCATION,
    payload: payload,
  };
};

export const setNotification = (payload) => {
  return {
    type: actionTypes.SET_NOTIFICATION,
    payload: payload,
  };
};

export const updateConfigData = (payload) => {
  return {
    type: actionTypes.UPDATE_CONFIG_DATA,
    payload: payload,
  };
};
export const clearNotification = (payload) => {
  return {
    type: actionTypes.CLEAR_NOTIFICATION,
    payload: payload,
  };
};

export const authenticate = (payload) => {
  return {
    type: actionTypes.AUTHENTICATE,
    payload: payload,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export function loadData() {
  return function (dispatch) {
    return axios.get("http://localhost:8000/").then(({ data }) => {
      dispatch(setData(data));
    });
  };
}
export const setData = (data) => {
  return {
    type: actionTypes.LOAD_DATA,
    payload: data,
  };
};
