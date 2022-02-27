import {ADD_TO_CART} from "../action-types/cartActionType";


export const addHandler=({product, price, size, img, title, color, quantity}) => {
    return {
        type : ADD_TO_CART,
        payload :{ product,price, size, img, title, color, quantity}
        
    }
}

   
           