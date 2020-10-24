import * as actionTypes from "../actions/actionTypes";

const packageReducer = function (
  state = {
    pickUpAddress: null,
    dropAddress: null,
    packageData: {
      types: {},
      message: ""
    }
  },
  action
) {
  switch (action.type) {
    case actionTypes.SET_PICKUP_ADDRESS:
      return {
        ...state,
        pickUpAddress: action.payload
      };
    case actionTypes.SET_DROP_ADDRESS:
      return {
        ...state,
        dropAddress: action.payload
      };
    case actionTypes.DELETE_PICKUP_ADDRESS:
      return {
        ...state,
        pickUpAddress: null
      };
    case actionTypes.DELETE_DROP_ADDRESS:
      return {
        ...state,
        dropAddress: null
      };
    case actionTypes.SET_PACKAGE_DATA:
      return {
        ...state,
        packageData: action.payload
      };     
    default:
      return state;
  }
};
export default packageReducer;
