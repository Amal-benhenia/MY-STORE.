import {combineReducers  } from "redux";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./reducerAuth";

export const rootReducer=combineReducers({
    auth:authReducer,
    cart:cartReducer
})