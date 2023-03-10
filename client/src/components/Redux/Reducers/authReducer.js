import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../Actions/types";

const user = JSON.parse(localStorage.getItem("user"));
let initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

export default function authReducer(state = initialState, action) {
  console.log("authReducer: ", action.type);
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        message: payload.message,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        message: payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
