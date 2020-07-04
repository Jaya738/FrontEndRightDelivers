import * as actionTypes from "./actionTypes";

export const updateRestaurants = (payload) => {
  return {
    type: actionTypes.UPDATE_RESTAURANTS,
    payload: payload,
  };
};

export const setCurRestaurant = (payload) => {
  return {
    type: actionTypes.SET_CUR_RESTAURANT,
    payload: payload,
  };
};
