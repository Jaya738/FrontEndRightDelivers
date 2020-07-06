import * as actionTypes from "../actions/actionTypes";

const configReducer = function (
  state = {
    curLocation: "",
    isAuth: false,
    authData: {},
    baseUrl: "https://api.rightdelivers.in/user/api/v1/",
    loadedData: {},
    curBranch: { bid: "", services: [] },
    notification: "",
    showNotification: false,
    rcats: [],
    services: {
      "1": {
        id: 1,
        name: "Food Delivery",
        link: "restaurants",
        image: "images/category/Food.svg",
        shortd: "",
        longd: "",
      },
      "2": {
        id: 2,
        name: "Groceries",
        image: "images/category/Groceries.svg",
        shortd: "",
        longd: "",
      },
      "3": {
        id: 3,
        name: "Medicines",
        link: "groceries",
        image: "images/category/Medicines.svg",
        shortd: "",
        longd: "",
      },
      "4": {
        id: 4,
        name: "Fruits and Vegetables",
        image: "images/category/Fruits.svg",
        shortd: "",
        longd: "",
      },
      "5": {
        id: 5,
        name: "Send Packages",
        image: "images/category/Package_1.svg",
        shortd: "",
        longd: "",
      },
      "6": {
        id: 6,
        name: "Cake Delivery",
        image: "images/category/cake.png",
        shortd: "",
        longd: "",
      },
    },
    branches: [],
  },
  action
) {
  switch (action.type) {
    case actionTypes.LOAD_DATA:
      return {
        ...state,
        loadedData: action.payload,
      };
    case actionTypes.AUTHENTICATE:
      return {
        ...state,
        isAuth: true,
        authData: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuth: false,
        authData: {},
        curLocation: "",
      };
    case actionTypes.UPDATE_CONFIG_DATA:
      return {
        ...state,
        branches: action.payload.branches,
        rcats: action.payload.rcats,
        //services: action.payload.services,
      };
    case actionTypes.SET_LOCATION:
      return {
        ...state,
        curBranch: action.payload,
        showNotification: false,
        notification: "",
        curLocation: action.payload.name,
      };

    case actionTypes.SET_NOTIFICATION:
      return { ...state, notification: action.payload, showNotification: true };

    case actionTypes.CLEAR_NOTIFICATION:
      return { ...state, notification: "", showNotification: false };

    default:
      return state;
  }
};
export default configReducer;
