import { combineReducers } from "redux";
import Authreducer from "./authReducer";

export default combineReducers({
    auth: Authreducer
})