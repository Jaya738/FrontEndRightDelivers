import * as actionTypes from "../actions/actionTypes";
import { baseUrl } from "../../config";
import { unsubscribeToSockets } from "../../api";

const configReducer = function (
  state = {
    curLocation: "",
    isAuth: false,
    authData: {
      user: { name: "", mbl: "", userid: 0 },
      phone: "",
      rKey: "",
      dKey: "",
    },
    backUrl: "/",
    baseUrl: baseUrl,
    loadedData: {},
    curBranch: { bid: "", services: [] },
    curService: { name: "", pic: "" },
    notification: "",
    showNotification: false,
    rcats: [],
    services: {},
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
      unsubscribeToSockets(state.authData.user.userid);
      localStorage.clear();
      return {
        ...state,
        isAuth: false,
        authData: {},
        curLocation: "",
        backUrl: "/",
      };
    case actionTypes.SET_BACK_URL:
      return {
        ...state,
        backUrl: action.payload,
      };
    case actionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            name: action.payload.name,
          },
        },
      };
    case actionTypes.UPDATE_CONFIG_DATA:
      const selectedBranch = action.payload.branches.find(
        (x) => x.bid === state.curBranch.bid
      );
      return {
        ...state,
        branches: action.payload.branches,
        rcats: action.payload.rcats,
        services: action.payload.services,
        curBranch: selectedBranch,
        isAuth: action.payload.auth === 1 ? true : false,
        authData: {
          ...state.authData,
          user: action.payload.user
            ? {
                ...state.authData.user,
                ...action.payload.user[0],
              }
            : state.authData.user,
        },
      };
    case actionTypes.SET_LOCATION:
      return {
        ...state,
        curBranch: action.payload,
        showNotification: false,
        notification: "",
        curLocation: action.payload.name,
      };
    case actionTypes.SET_CUR_SERVICE:
      return {
        ...state,
        curService: action.payload,
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
