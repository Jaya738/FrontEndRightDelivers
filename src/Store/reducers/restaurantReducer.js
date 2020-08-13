import * as actionTypes from "../actions/actionTypes";

const restaurantReducer = function (
  state = {
    curRestaurant: {},
    items: [],
    refreshRestaurants:true
  },
  action
) {
  switch (action.type) {
    case actionTypes.UPDATE_RESTAURANTS:
      return {
        ...state,
        items: action.payload.restaurants,
      };
    case actionTypes.SET_CUR_RESTAURANT:
      return {
        ...state,
        curRestaurant: action.payload,
      };
    case actionTypes.SET_RELOAD_RESTAURANTS:
      console.log(action)
      return {
        ...state,
        refreshRestaurants:true
      };
    case actionTypes.SET_LOADED_RESTAURANTS:
      console.log(action.payload.restaurants)
      return {
        ...state,
        refreshRestaurants:false,
        items:action.payload.restaurants
      };     
    default:
      return state;
  }
};
export default restaurantReducer;
