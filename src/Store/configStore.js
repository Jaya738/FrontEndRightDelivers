import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import _ from "lodash";

import configReducer from "./reducers/configReducer";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer";
import restaurantReducer from "./reducers/restaurantReducer";

import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

const rootReducer = combineReducers({
  config: configReducer,
  cart: cartReducer,
  product: productReducer,
  restaurant: restaurantReducer,
});

const Store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

Store.subscribe(
  _.throttle(() => {
    saveState({
      cart: Store.getState().cart,
      config: Store.getState().config,
    });
  }, 1000)
);

export default Store;
