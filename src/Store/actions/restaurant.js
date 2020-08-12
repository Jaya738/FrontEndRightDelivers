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

export const setLoadedRestaurants = (payload) => {
  return {
    type: actionTypes.SET_LOADED_RESTAURANTS,
    payload: payload,
  };
};

export const setReloadRestaurants = () => {
  return {
    type: actionTypes.SET_RELOAD_RESTAURANTS,
  };
};