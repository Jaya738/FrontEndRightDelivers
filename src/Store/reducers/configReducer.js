import * as actionTypes from "../actions/actionTypes";
import { baseUrl } from "../../config";

const configReducer = function (
  state = {
    curLocation: "",
    isAuth: false,
    authData: { user: { name: "", mbl: "" }, phone: "", rKey: "", dKey: "" },
    backUrl: "/",
    baseUrl: baseUrl,
    loadedData: {},
    curBranch: { bid: "", services: [] },
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
    case actionTypes.UPDATE_CONFIG_DATA:
      return {
        ...state,
        branches: action.payload.branches,
        rcats: action.payload.rcats,
        services: action.payload.services,
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
