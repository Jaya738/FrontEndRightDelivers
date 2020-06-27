import * as actionTypes from "./actionTypes";

export const addToCart = (payload) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: payload,
  };
};

export const setQuantity = (payload) => {
  return {
    type: actionTypes.SET_QUANTITY,
    payload: payload,
  };
};

export const setCheckoutData = (payload) => {
  return {
    type: actionTypes.SET_CHECKOUT_DATA,
    payload: payload,
  };
};

export const deleteCartItem = (pid) => {
  return {
    type: actionTypes.DELETE_CART_ITEM,
    payload: pid,
  };
};

export const getDerivedPrice = (pid) => {
  return {
    type: actionTypes,
  };
};
