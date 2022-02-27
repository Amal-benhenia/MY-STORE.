import React from 'react'
import styled from 'styled-components' 
import { Search, ShoppingCartOutlined} from '@material-ui/icons'
import { Badge } from '@material-ui/core'
import {mobile} from '../responsive'
import {useDispatch, useSelector} from "react-redux"
import { Link } from 'react-router-dom'
import { logoutHandler } from '../redux/actions/actionAuth'

const Container = styled.div`
height : 60px;
background-color: #fcf5f5;
${mobile({ padding: "0px 0px"})};

`
const Wrapper = styled.div`
padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Left = styled.div`
flex:1;
display: flex;
align-items: center
`
const Language = styled.span`
font-size: 14px;
cursor: pointer;
${mobile({ fontSize: "10px"})};
`
const SearchContainer = styled.div`
background-color:
border: 0.5px solid lightgray;
display: flex;
align-items: center;
margin-left: 25px;
padding: 5px;
${mobile({ marginLeft: "0px"})};
`
const Input = styled.input`
border: none;
${mobile({ width: "60px"})};
`
const Center = styled.div`
flex:1;
text-align: center;
`
const Logo = styled.h1`
font-weight: bold;
${mobile({ fontSize: "18px"})};
`
const Right = styled.div`
flex:1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({ justifyContent: "center", flex: "2"})};
`
const Menu = styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;
${mobile({ fontSize: "10px", marginLeft:"15px" })};

`



const Navbar = () => {

const dispatch = useDispatch()
const logoutUser=()=>{
  dispatch(logoutHandler())
}
const authLinks = (
      <Right>
        <Menu onClick={logoutUser} > LOGOUT </Menu>
      </Right>
);

const visitorLinks = (
      <Right>
      <Link path to='/register'>
       <Menu>REGISTER</Menu>
       </Link>
       <Link path to ='/login'>
       <Menu>SIGN IN</Menu>
       </Link>
      </Right>
);

const isAuth = useSelector(state=>state.auth.isAuth)
console.log(isAuth);
 const quantity = useSelector(state=>state.cart.quantity)

 

return (
        <Container>
            <Wrapper>
            <Left> 
                <Language>EN</Language>
                <SearchContainer>
                    <Input placeholder="Search"/>
                    <Search style={{color: "gray", fontSize:18}}/>
                </SearchContainer>
            </Left>
            <Center> <Logo> MY STORE.</Logo></Center>
            <Right>
            {isAuth? authLinks: visitorLinks}
                <Link to ="/cart">
                <Menu>
                <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
                </Badge>
                </Menu>
                </Link>
            </Right>
            </Wrapper>
            </Container>
    )
}

export default Navbar
