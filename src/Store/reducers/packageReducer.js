import * as actionTypes from "../actions/actionTypes";

const packageReducer = function (
  state = {
    pickUpAddress: null,
    dropAddress: null,
    packageData: {
      types: {
        1:"Documents",
        2:"Food",
        3:"Medicine",
        4:"Groceries",
        5:"Clothes & Accessories",
        6:"Electronic Goods",
        7:"Stationary Items",
        8:"Other Items",
      },
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
        packageData: action.payload?.types ? action.payload : state.packageData, 
        dropAddress: null,
        pickUpAddress: null
      };     
    default:
      return state;
  }
};
export default packageReducer;
