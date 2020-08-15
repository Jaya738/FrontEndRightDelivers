import * as actionTypes from "../actions/actionTypes";

const notificationsReducer = function (
  state = {
    notificationsList: [],
    refreshNotifications:true
  },
  action
) {
  switch (action.type) {
    case actionTypes.SET_RELOAD_NOTIFICATIONS:
      return {
        ...state,
        refreshNotifications:true
      };
    case actionTypes.SET_LOADED_NOTIFICATIONS:
      return {
        ...state,
        refreshNotifications:false,
        notificationsList:action.payload
      };     
    default:
      return state;
  }
};
export default notificationsReducer;
