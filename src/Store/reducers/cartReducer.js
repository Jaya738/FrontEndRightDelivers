import * as actionTypes from "../actions/actionTypes";

const cartReducer = function (
  state = {
    cartItems: [],
    checkoutData: {
      totalPrice: 0,
      subTotal: 0,
      deliveryCharge: 0,
      savings: 0,
    },
  },
  action
) {
  switch (action.type) {
    case actionTypes.SET_QUANTITY: {
      const existingCartItem = state.cartItems.find(
        (item) => item.pid === action.payload.pid
      );
      existingCartItem.quantity = action.payload.quantity;
      return {
        ...state,
      };
    }
    case actionTypes.SET_CHECKOUT_DATA: {
      return {
        ...state,
        checkoutData: action.payload,
      };
    }
    case actionTypes.CLEAR_AND_ADD: {
      let emptyCrt = [];
      emptyCrt.push(action.payload);
      console.log(emptyCrt);
      return {
        ...state,
        cartItems: emptyCrt,
      };
    }

    case actionTypes.DELETE_CART_ITEM: {
      const newCartItems = state.cartItems.filter(
        (item) => item.pid !== action.payload
      );

      return {
        ...state,
        cartItems: newCartItems,
      };
    }
    case actionTypes.ADD_TO_CART:
      let added_item = state.cartItems.find(
        (item) => item.pid === action.payload.pid
      );
      let existed_item = state.cartItems.find(
        (item) => action.payload.pid === item.pid
      );
      if (existed_item) {
        added_item.quantity += action.payload.quantity;
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    default:
      return state;
  }
};
export default cartReducer;
