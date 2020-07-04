import * as actionTypes from "../actions/actionTypes";

const productReducer = function (
  state = {
    curProduct: {},
    items: [],
  },
  action
) {
  switch (action.type) {
    case actionTypes.UPDATE_PRODUCTS:
      console.log(action.payload);
      return {
        ...state,
        items: action.payload.items,
      };
    case actionTypes.SET_CUR_PRODUCT:
      console.log(action.payload);
      return {
        ...state,
        curProduct: action.payload,
      };
    default:
      return state;
  }
};
export default productReducer;
