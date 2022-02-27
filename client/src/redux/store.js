import {configureStore} from "@reduxjs/toolkit";
import shoppingCartReducer from "./redux/shoppingCartRedux";


export default configureStore({
    reducer:{
        cart:shoppingCartReducer,
       
    }
})