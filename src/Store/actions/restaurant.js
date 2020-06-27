import * as actionTypes from "./actionTypes";

export const loadRestaurants = () => {
  return {
    type: actionTypes.LOAD_RESTAURANTS,
  };
};

export const setCurRestaurant = (payload) => {
  return {
    type: actionTypes.SET_CUR_RESTAURANT,
    payload: payload,
  };
};
