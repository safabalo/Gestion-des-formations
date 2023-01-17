import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./types";
import axios from 'axios';
const URL = 'http://localhost:2000/auth/';

export const login = (user) => (dispatch) => {
    // return AuthService.Login(user)
    axios.post(URL+ 'login', user)
    .then(res => {
    if (!res.data.message) dispatch({ type: LOGIN_FAIL, payload: res.data });
    else {
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      console.log(res.data)
    }
  })
  }

export const logout = () => (dispatch) => {
    axios.get(URL+ 'logout')
    .then(()=> {
        localStorage.removeItem('user')
        dispatch({
            type: LOGOUT,
        });
    })
    // .catch(err => {
    //     console.log(err.msg)
    // })  
    
}
