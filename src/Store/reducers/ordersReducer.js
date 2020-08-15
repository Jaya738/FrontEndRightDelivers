import * as actionTypes from "../actions/actionTypes";

const ordersReducer = function (
  state = {
    activeOrders: [],
    allOrders: [],
    orderStatus: {},
  },
  action
) {
  const allowedStatus = [2,3,4,5,77,99];
  switch (action.type) {
    case actionTypes.SET_ALL_ORDERS: {
      return {
        ...state,
        allOrders: action.payload,
      };
    }
    case actionTypes.ADD_NEW_ORDER: {
      return {
        ...state,
        activeOrders: [...state.activeOrders,action.payload],
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
      if(allowedStatus.includes(action.payload.ost)){
        const elementsIndex = state.activeOrders.findIndex(element => element.ordid === action.payload.orderId )
      let newActiveOrders = [...state.activeOrders]
      newActiveOrders[elementsIndex] = {
        ...newActiveOrders[elementsIndex],
        ost:action.payload.ost 
      }
      return {
        ...state,
        activeOrders: newActiveOrders
      };
      }
      else{
        return{
          ...state
        }
      }
      
    }
    default:
      return state;
  }
};
export default ordersReducer;
