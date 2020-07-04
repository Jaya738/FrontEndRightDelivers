import * as actionTypes from "../actions/actionTypes";

const configReducer = function (
  state = {
    curLocation: "",
    isAuth: true,
    authData: {},
    baseUrl: "https://api.rightdelivers.in/user/api/v1/",
    loadedData: {},
    curBranch: { services: [] },
    notification: "",
    showNotification: false,
    services: {
      "1": {
        id: 1,
        name: "Food Delivery",
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
    branches: [
      {
        bid: 1,
        name: "Godavarikhani",
        route: "/godavarikhani",
        mobile: 9987654987,
        email: "xyz@email.com",
        address: "11 Street etc",
        services: [1, 2, 3, 4, 5, 6],
        image: "image or icon",
      },
      {
        bid: 2,
        name: "Peddapalli",
        route: "/peddapalli",
        mobile: 9987654987,
        email: "xyz@email.com",
        address: "11 Street etc",
        services: [1, 2, 3, 4, 5],
        image: "image or icon",
      },
      {
        bid: 3,
        name: "Karimnagar",
        route: "/karimnagar",
        mobile: 9987654987,
        email: "xyz@email.com",
        address: "11 Street etc",
        services: [1, 2, 3, 4, 5, 6],
        image: "image or icon",
      },
    ],
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
      };
    case actionTypes.SET_LOCATION:
      return {
        ...state,
        curBranch: action.payload,
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
