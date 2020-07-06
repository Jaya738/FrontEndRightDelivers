import * as actionTypes from "../actions/actionTypes";

const restaurantReducer = function (
  state = {
    curRestaurant: {},
    items: [],
  },
  action
) {
  switch (action.type) {
    case actionTypes.UPDATE_RESTAURANTS:
      console.log(action.payload.restaurants);
      return {
        ...state,
        items: action.payload.restaurants,
      };
    case actionTypes.SET_CUR_RESTAURANT:
      console.log(action.payload);
      return {
        ...state,
        curRestaurant: action.payload,
      };
    default:
      return state;
  }
};
export default restaurantReducer;
