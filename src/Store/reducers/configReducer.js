import * as actionTypes from "../actions/actionTypes";
import { baseUrl } from "../../config";
import { unsubscribeToSockets } from "../../api";

const configReducer = function (
  state = {
    curLocation: "",
    isAuth: false,
    authData: { user: { name: "", mbl: "",userid:0 }, phone: "", rKey: "", dKey: "" },
    backUrl: "/",
    baseUrl: baseUrl,
    loadedData: {},
    curBranch: { bid: "", services: [] },
    curService : {name:"",pic:""},
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
      unsubscribeToSockets(state.authData.user.userid)
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
        isAuth : action.payload.auth===1 ? true : false 
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
        curService : action.payload
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
