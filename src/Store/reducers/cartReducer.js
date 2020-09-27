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
      return {
        ...state,
        cartItems: emptyCrt,
      };
    }
    case actionTypes.CLEAR_CART: {
      return {
        ...state,
        cartItems: [],
        checkoutData: {
          totalPrice: 0,
          subTotal: 0,
          deliveryCharge: 0,
          savings: 0,
        },
      };
    }

    case actionTypes.DELETE_CART_ITEM: {
      const newCartItems = state.cartItems.filter(
        (item) => item.pid !== action.payload
      );
      let amountA = 0;
      let amountS = 0;
      newCartItems.map((item) => {
        amountA +=
          (parseInt(item.itemPrice) + parseInt(item.extraPrice)) *
          item.quantity;
        amountS += item.sprice * item.quantity;
        return amountA;
      });
      const payload = {
        ...state.checkoutData,
        subTotal: amountA,
        savings: amountS - amountA,
        totalPrice: amountA + parseInt(state.checkoutData.delivery),
      };
      return {
        ...state,
        cartItems: newCartItems,
        checkoutData: payload,
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
