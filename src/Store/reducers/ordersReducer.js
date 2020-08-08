import * as actionTypes from "../actions/actionTypes";

const ordersReducer = function (
  state = {
    activeOrders: {},
    allOrders: {},
    orderStatus: {},
  },
  action
) {
  switch (action.type) {
    case actionTypes.SET_ALL_ORDERS: {
      return {
        ...state,
        allOrders: action.payload,
      };
    }
    case actionTypes.SET_ACTIVE_ORDERS: {
      return {
        ...state,
        activeOrders: action.payload,
      };
    }
    case actionTypes.SET_ORDER_STATUS: {
      console.log(action.payload);
      return {
        ...state,
        orderStatus: action.payload,
      };
    }
    default:
      return state;
  }
};
export default ordersReducer;
