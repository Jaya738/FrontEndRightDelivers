import * as actionTypes from "../actions/actionTypes";
const allowedStatus = [2, 3, 4, 5, 77, 99];
const ordersReducer = function (
  state = {
    activeOrders: [],
    allOrders: [],
    orderStatus: {},
    ratings: [],
    packageStatuses: {},
    packageTypes: {}
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
      return {
        ...state,
        activeOrders:
          state.activeOrders.length > 0
            ? [...state.activeOrders, action.payload]
            : [action.payload],
      };
    }
    case actionTypes.SET_ACTIVE_ORDERS: {
      if (action.payload.status === 1) {
        return {
          ...state,
          activeOrders: action.payload.activeOrders,
        };
      } else {
        return {
          ...state,
          activeOrders: action.payload.activeOrders,
          orderStatus: action.payload.statuses,
          ratings: action.payload.rating,
          packageStatuses: action.payload.packages.statuses,
          packageTypes: action.payload.packages.types,
        };
      }
    }
    case actionTypes.CLEAR_ORDERS: {
      return {
        ...state,
        activeOrders: {},
        allOrders: {},
      };
    }
    case actionTypes.SET_ORDER_STATUS: {
      let ratings = [];
      //Todo : Show Rating on delivered msg 
      // if(action.payload.ost === 5){
      //   ratings.push(action.payload)
      // }
      if (allowedStatus.includes(action.payload.ost)) {
        const elementsIndex = state.activeOrders.findIndex(
          (element) => element.ordid === action.payload.id
        );
        let newActiveOrders = [...state.activeOrders];
        newActiveOrders[elementsIndex] = {
          ...newActiveOrders[elementsIndex],
          ost: action.payload.ost,
        };
        return {
          ...state,
          activeOrders: newActiveOrders,
          ratings: ratings
        };
      } else {
        return {
          ...state,
        };
      }
    }
    default:
      return state;
  }
};
export default ordersReducer;
