import * as actionTypes from "./actionTypes";

export const setPickupAddress = (payload) => {
  return {
    type: actionTypes.SET_PICKUP_ADDRESS,
    payload: payload,
  };
};

export const setDropAddress = (payload) => {
  return {
    type: actionTypes.SET_DROP_ADDRESS,
    payload: payload,
  };
};

export const deletePickupAddress = () => {
  return {
    type: actionTypes.DELETE_PICKUP_ADDRESS,
  };
};

export const deleteDropAddress = () => {
  return {
    type: actionTypes.DELETE_DROP_ADDRESS,
  };
};

export const setPackageData = (payload) => {
  return {
    type: actionTypes.SET_PACKAGE_DATA,
    payload: payload
  };
};