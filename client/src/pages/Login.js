import { useEffect, useState } from "react";
import styled from "styled-components";
import {mobile} from '../responsive'
import {useDispatch, useSelector} from 'react-redux';
import { getUserHandler, signInHandler } from "../redux/actions/actionAuth";
import { Link } from "react-router-dom"



const Container = styled.div`
width: 100wh;
height: 100vh;
background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    
    
    `
const Wrapper = styled.div`
width: 30%;
padding: 20px;
background-color: white;
${mobile({width:"70%"})};`

const Title = styled.h1`
font-size: 30px;
font-weight: 400;
`

const Form = styled.form`
display: flex;
flex-direction: column;`

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 15px 0px;
padding: 8px;`


const Button = styled.button`
width: 15%;
border: none;
padding: 10px 15px;
background-color: cadetblue;
color: white;
cursor: pointer;
margin-bottom: 10px;
${mobile({width:"30%"})};
`

const Links = styled.a`
margin: 5px 0px;
font-size: 15px;
text-decoration: underline;
cursor: pointer;
`

function Login() { 
const [email, setEmail]=useState("")
const [password, setPassword]=useState("")
const dispatch = useDispatch()
 
const loginUser = (e)=>{
  e.preventDefault()
  const user={email, password}
  dispatch(signInHandler(user))
  console.log(user)
}


  return ( 
      <Container>
      <Wrapper>
      <Title>SIGN IN</Title>
      <Form>
      <Input placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
      <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)}  />
      <Link path to='/'>
      
      <Button onClick={loginUser} >Login</Button>

      </Link>
      
     <Links>You do not remember your password?</Links>
     <Links>Create a new account</Links>
      </Form>
      </Wrapper>
      </Container>
    )
}
export default Login;
