import * as actionTypes from "../actions/actionTypes";

const packageReducer = function (
  state = {
    pickUpAddress: null,
    dropAddress: null
  },
  action
) {
  switch (action.type) {
    case actionTypes.SET_PICKUP_ADDRESS:
      return {
        pickUpAddress: action.payload
      };
    case actionTypes.SET_DROP_ADDRESS:
      return {
        ...state,
        dropAddress: action.payload
      };
    case actionTypes.DELETE_PICKUP_ADDRESS:
      return {
        pickUpAddress: null
      };
    case actionTypes.DELETE_DROP_ADDRESS:
      return {
        ...state,
        dropAddress: null
      };     
    default:
      return state;
  }
};
export default packageReducer;
