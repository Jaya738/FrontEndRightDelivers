import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import _ from "lodash";

import configReducer from "./reducers/configReducer";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer";
import restaurantReducer from "./reducers/restaurantReducer";
import addressReducer from "./reducers/addressReducer";
import ordersReducer from "./reducers/ordersReducer";

import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

const rootReducer = combineReducers({
  config: configReducer,
  cart: cartReducer,
  product: productReducer,
  restaurant: restaurantReducer,
  address: addressReducer,
  orders: ordersReducer,
});

const Store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

Store.subscribe(
  _.throttle(() => {
    saveState({
      cart: Store.getState().cart,
      config: Store.getState().config,
      address: Store.getState().address,
      product: Store.getState().product,
      restaurant: Store.getState().restaurant,
    });
  }, 1000)
);

export default Store;
