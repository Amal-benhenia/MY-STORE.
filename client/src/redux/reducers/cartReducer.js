import { ADD_TO_CART} from "../action-types/cartActionType";

const initialState ={
    products: [],
    quantity: 0,
    total: 0,
    
}
export const cartReducer=(state=initialState, action)=>{
    switch(action.type){

        
          case ADD_TO_CART:
              return {
                  ...state,
                  products: [...state.products, action.payload],
                  quantity: state.quantity+1, 
                  total: state.total+action.payload?.price,
                  

                  
              }
          
        default:return state;
    }
}
 
  
    