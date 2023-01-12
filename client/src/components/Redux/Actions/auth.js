import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./types";
import AuthService from "../Services/Authentification";

export const login = (user) => (dispatch) => {
    return AuthService.Login(user)
    .then((res) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res,
        });
        })
    .catch((error) => {
        dispatch({
            type: LOGIN_FAIL,
        });
    })
};
export const logout = () => (dispatch) => {
    AuthService.Logout();
    dispatch({
        type: LOGOUT,
    });
}
