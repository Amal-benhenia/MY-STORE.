import axios from "axios";
import { GET_USER, LOGIN, LOGOUT, REGISTER } from "../action-types/actionTypesAuth";


export const registerHandler=(newUser)=> async (dispatch)=>{
try {
    const res= await axios.post('http://localhost:5000/api/auth/register',newUser);
    dispatch({
        type:REGISTER,
        payload:res.data
    })
} catch (error) {
   console.log(error); 
}
}
export const signInHandler =(user)=>async (dispatch)=>{
    try {
       const res= await axios.post('http://localhost:5000/api/auth/login',user)
       dispatch({
           type:LOGIN,
           payload:res.data
       })
    } catch (error) {
       console.log(error); 
    }
}
export const logoutHandler = () => async (dispatch) => {
    try {
      dispatch({
        type: LOGOUT,
      });
    } catch (error) {
      console.log(error);
    }
  };
export const getUserHandler = ()=> async(dispatch)=>{
    const config={
        headers:{
           "x-auth-token":localStorage.getItem('token')
        }
    }
    try {
       const res = await axios.get('http://localhost:5000/api/users/profile/:id',config)
       dispatch({
           type:GET_USER,
           payload:res.data
       })
    } catch (error) {
       console.log(error) 
    }
}
  