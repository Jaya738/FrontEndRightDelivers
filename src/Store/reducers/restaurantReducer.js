import * as actionTypes from "../actions/actionTypes";

const restaurantReducer = function (
  state = {
    curRestaurant: {},
    items: [
      {
        rid: "1",
        catid: "3",
        name: "Restaurant 1",
        img: "",
      },
      {
        rid: "2",
        catid: "3",
        name: "Restaurant 2",
        img: "",
      },
      {
        rid: "3",
        catid: "3",
        name: "Restaurant 3",
        img: "",
      },

      {
        rid: "4",
        catid: "3",
        name: "Restaurant 4",
        img: "",
      },
      {
        rid: "5",
        catid: "3",
        name: "Restaurant 5",
        img: "",
      },
      {
        rid: "6",
        catid: "3",
        name: "Restaurant 6",
        img: "",
      },
      {
        rid: "7",
        catid: "3",
        name: "Restaurant 7",
        img: "",
      },
    ],
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
