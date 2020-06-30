import * as actionTypes from "./actionTypes";

export const addNewAddress = () => {
  return {
    type: actionTypes.ADD_NEW_ADDRESS,
  };
};

export const setCurAddress = (payload) => {
  return {
    type: actionTypes.SET_CUR_ADDRESS,
    payload: payload,
  };
};
export const setDefaultAddress = (payload) => {
  return {
    type: actionTypes.SET_DEFAULT_ADDRESS,
    payload: payload,
  };
};
