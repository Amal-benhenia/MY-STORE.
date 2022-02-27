import styled from "styled-components";
import {mobile} from '../responsive';
import {useDispatch, useSelector} from 'react-redux';
import { useState } from "react";
import { registerHandler } from "../redux/actions/actionAuth";

import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

const Container = styled.div`
width: 100wh;
height: 100vh;
background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    
    `
const Wrapper = styled.div`
width: 40%;
padding: 20px;
background-color: white;
${mobile({width:"70%"})};`

const Title = styled.h1`
font-size: 30px;
font-weight: 400;
`

const Form = styled.form`
display: flex;
flex-wrap: wrap;`

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 20px 8px 0px 0px;
padding: 8px;`

const Agreement = styled.span`
font-size: 14px;
margin: 10px 0px;`

const Button = styled.button`
width: 15%;
border: none;
padding: 10px 15px;
background-color: cadetblue;
color: white;
cursor: pointer;
${mobile({width:"30%"})};`



function Register() {
  const [show, setShow] = useState(false);
  const [username, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  
const dispatch = useDispatch()

const registerUser=(e)=>{
  e.preventDefault()
  const newUser={username,email, password}
  dispatch(registerHandler(newUser))
  
}
const isAuth = useSelector(state=>state.auth.isAuth)
  console.log(isAuth);
  return ( 
      <Container>
      <Wrapper>
      <Title>Create An Account</Title>
      <Form>
      <Input placeholder="user name" onChange={(e) => setuserName(e.target.value)}/>
      <Input placeholder="email" onChange={(e) => setemail(e.target.value)}/>
      <Input placeholder="password" type='password' />
      <Input placeholder="confirm password" type='password' onChange={(e) => setpassword(e.target.value)}/>
      <Agreement>
      By creating an account, I consent to the processing of my personal data in accordance with the <b> PRIVACY POLICY</b>
      </Agreement>
      <Link path to='/' >
    <Button onClick={registerUser}>Create</Button>
    </Link>
    
      </Form>
      </Wrapper>
      </Container>
    )
}

export default Register;

