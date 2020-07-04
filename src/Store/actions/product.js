import * as actionTypes from "./actionTypes";

export const updateProducts = (payload) => {
  return {
    type: actionTypes.UPDATE_PRODUCTS,
    payload: payload,
  };
};

export const setCurProduct = (payload) => {
  return {
    type: actionTypes.SET_CUR_PRODUCT,
    payload: payload,
  };
};
