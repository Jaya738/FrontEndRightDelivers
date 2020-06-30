import * as actionTypes from "../actions/actionTypes";

const addressReducer = function (
  state = {
    curAddress: {},
    defaultAddress: {},
    addressList: [],
  },
  action
) {
  switch (action.type) {
    case actionTypes.ADD_NEW_ADDRESS:
      return {
        ...state,
        addressList: [...state.addressList, action.payload],
      };
    case actionTypes.SET_DEFAULT_ADDRESS:
      return {
        ...state,
        defaultAddress: action.payload,
      };
    case actionTypes.SET_CUR_ADDRESS:
      return {
        ...state,
        curAddress: action.payload,
      };
    default:
      return state;
  }
};
export default addressReducer;
