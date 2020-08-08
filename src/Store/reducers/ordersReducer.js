import * as actionTypes from "../actions/actionTypes";

const ordersReducer = function (
  state = {
    activeOrders: [],
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
    case actionTypes.ADD_NEW_ORDER: {
      console.log(action.payload);
      return {
        ...state,
        activeOrders: state.activeOrders.push(action.payload),
      };
    }
    case actionTypes.SET_ACTIVE_ORDERS: {
      return {
        ...state,
        activeOrders: action.payload.activeOrders,
        orderStatus: action.payload.status,
      };
    }
    case actionTypes.SET_ORDER_STATUS: {
      console.log(action.payload);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
export default ordersReducer;
