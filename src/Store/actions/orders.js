import * as actionTypes from "./actionTypes";

export const setActiveOrders = (payload) => {
  return {
    type: actionTypes.SET_ACTIVE_ORDERS,
    payload: payload,
  };
};

export const setAllOrders = (payload) => {
  return {
    type: actionTypes.SET_ALL_ORDERS,
    payload: payload,
  };
};
export const setOrderStatus = (payload) => {
  return {
    type: actionTypes.SET_ORDER_STATUS,
    payload: payload,
  };
};
export const addNewOrder = (payload) => {
  return {
    type: actionTypes.ADD_NEW_ORDER,
    payload: payload,
  };
};
