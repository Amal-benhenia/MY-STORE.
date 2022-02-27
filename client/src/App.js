import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Success from "./pages/Success";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserHandler } from "./redux/actions/actionAuth";


export default function App () {
  
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getUserHandler())
  },[])

  const user = useSelector(state=>state.user)
  
  return (
    <Router>
    <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route path="/products/:category" element={<ProductList/>}/>
    <Route path="/product/:id" element={<Product/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/success" element={<Success/>}/>
    <Route path="/login" element ={<Login/>}/> 
    <Route path="/register" element={<Register/>}/>    
</Routes>
</Router>
  )
}
