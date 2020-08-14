import * as actionTypes from "../actions/actionTypes";

const ordersReducer = function (
  state = {
    activeOrders: [],
    allOrders: [],
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
      if(action.payload.status === 1){
        return {
          ...state,
          activeOrders: action.payload.activeOrders,
        };
      }
      else{
        return {
          ...state,
          activeOrders: action.payload.activeOrders,
          orderStatus: action.payload.statuses,
        };
      }
      
    }
    case actionTypes.CLEAR_ORDERS: {
      return {
        ...state,
        activeOrders: {},
        allOrders : {}
      };
    }
    case actionTypes.SET_ORDER_STATUS: {
      const elementsIndex = state.activeOrders.findIndex(element => element.ordid == action.payload.orderId )
      console.log(action.payload);
      console.log(elementsIndex)
      let newActiveOrders = [...state.activeOrders]
      newActiveOrders[elementsIndex] = {
        ...newActiveOrders[elementsIndex],
        ost:action.payload.ost 
      }
      console.log(newActiveOrders)
      return {
        ...state,
        activeOrders: newActiveOrders
      };
    }
    default:
      return state;
  }
};
export default ordersReducer;
