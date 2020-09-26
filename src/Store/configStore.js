import { createStore, combineReducers } from "redux";
import _ from "lodash";

import configReducer from "./reducers/configReducer";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer";
import restaurantReducer from "./reducers/restaurantReducer";
import addressReducer from "./reducers/addressReducer";
import ordersReducer from "./reducers/ordersReducer";
import { loadState, saveState } from "./localStorage";
import notificationsReducer from "./reducers/notificationsReducer";

const persistedState = loadState();

const rootReducer = combineReducers({
  config: configReducer,
  cart: cartReducer,
  product: productReducer,
  restaurant: restaurantReducer,
  address: addressReducer,
  orders: ordersReducer,
  notifications: notificationsReducer,
});

const Store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

Store.subscribe(
  _.throttle(() => {
    saveState({
      cart: Store.getState().cart,
      config: Store.getState().config,
      address: Store.getState().address,
      product: Store.getState().product,
      orders: Store.getState().orders,
      restaurant: Store.getState().restaurant,
    });
  }, 1000)
);

export default Store;
