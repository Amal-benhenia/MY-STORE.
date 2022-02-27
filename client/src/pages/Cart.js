import Announcement  from "../components/Announcments";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import { Add, Remove } from "@material-ui/icons";
import {mobile} from '../responsive';
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'


const KEY = process.env.REACT_APP_STRIPE;
const Container = styled.div``
const Wrapper = styled.div`
text-align: center;
padding: 10px;
${mobile({padding:"5px"})};`

const Title = styled.h1`
font-weight: 400;
font-size: 30px
`
const Top = styled.div`
display: flex;
aligh-items: center;
justify-content: space-between;
padding: 30px`

const TopButton = styled.button`
padding: 5px;
font-weight: 500;
cursor: pointer;
border: ${props=>props.type === "filled" && "none"};
background-color: ${props=>props.type === "filled"? "black": "transparent"};
color: ${props=>props.type === "filled" && "white"};`


const Toptext = styled.div`
${mobile({display:"none"})}
`

const Text = styled.span`
text-decoration: underline;
cursor: pointer;
margin: 0px 10px;`

const Bottom = styled.div`
display: flex;
${mobile({flexDirection:"column"})};`

const ProductInfo = styled.div`
flex: 3;`

const ProductSummary = styled.div`
flex: 1;
border: 0.5px solid lightgray;
border-radius: 10px;
padding: 30px;
height:50vh;`

const Product = styled.div`
display: flex;
justify-content: space-between;
${mobile({flexDirection:"column"})}
`
const ProductDetails = styled.div`
flex: 2;
display: flex;

`
const Image = styled.img`
width: 300px;
${mobile({width:"200px"})}
`
const Details = styled.div`

padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;

`
const ProductName = styled.span`
margin: 0px 10px;
`
const ProductID = styled.span`
`
const ProductColor = styled.div`
width: 20px;
height: 20px;
border-radius:50%;
background-color: ${props=>props.color};
margin-left: 95px;
${mobile({marginLeft:"50px"})}

`
const ProductSize = styled.span`
`
const PriceDetails= styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const ProductAmount = styled.div`
display: flex;
align-items: center;
margin-bottom: 30px;


`
const Amount = styled.div`
font-size: 20px;
${mobile({margin:"0px 15px"})};
`
const Price = styled.div`
font-size: 25px;
font-weight: 300;
${mobile({marginBottom:"15px"})};`

const Hr = styled.hr`
background-color: #eeeeee;
height: 1px;
border: none;`


const SumTitle = styled.h1`
font-weight: 300;
`

const Item = styled.div`
margin: 40px 0px;
display: flex;
justify-content: space-between;
font-weight: ${props=> props.type === "total" && "600"};
font-size: ${props=> props.type === "total" && "25px"};


`

const ProductPrice = styled.span``
const ProductText = styled.span``

const Button = styled.button`
width: 50%;
padding: 10px;
background-color: black;
color: white;
font-size: 600;
border: none;`

function Cart() {
  const cart = useSelector(state=>state.cart)
  const [stripeToken, setStripeToken]= useState(null)
  const navigate = useNavigate()
  const onToken = (token)=>{
    setStripeToken(token)
  }
  const quantity = useSelector(state=>state.cart.quantity)
  useEffect(()=>{
   const makeRequest = async ()=>{
     try {
       const res = await userRequest.post("/checkout/payment",{
        tokenId : stripeToken.id,
        amount: cart.products.total * 100,
        
       })
       navigate("/success",{data: res.data})
     } catch (error) {
       
     }
   }
   setStripeToken && makeRequest();
  },[stripeToken, cart.products.total, navigate])
  return (
      <Container>
     <Navbar/>
     <Announcement/>
      <Wrapper>
      <Title>My Shopping Cart</Title>
      <Top>
      <Link path to='/'>
     <TopButton>Continue Shopping</TopButton>
     </Link>
     <Toptext>
     <Text>Shopping Cart({quantity})</Text>
     <Text>My Wishlist(0)</Text>
     </Toptext>
    
      </Top>
      <Bottom>
      <ProductInfo>
      { cart.products?.map(item=>(
        <Product>
      <ProductDetails>
      <Image src={item?.img} />
      <Details>
      <ProductName> <b>Product:</b>  {item?.title}  </ProductName>
    
      <ProductColor color={item?.color} />  
      <ProductSize><b>Size:</b> {item?.size}</ProductSize>
      
      </Details>
      </ProductDetails>
      <PriceDetails>
      <ProductAmount>
      <Add/>
      <Amount>{item.quantity}</Amount>
      <Remove/>
      </ProductAmount>
      <Price>$ {item.price} </Price>
      </PriceDetails>
      </Product>
      ))}
      <Hr/>
    
      </ProductInfo>
      <ProductSummary>
      <SumTitle>Order Summary</SumTitle>
      <Item>
      <ProductText>Subtotal</ProductText>
      <ProductPrice>$ {cart.total}</ProductPrice>
      </Item>
      <Item>
      <ProductText>Estimated Shipping</ProductText>
      <ProductPrice>$ 7</ProductPrice>
      </Item>
      <Item>
      <ProductText>Shipping Discount</ProductText>
      <ProductPrice>$ -7</ProductPrice>
      </Item>
      <Item type="total">
      <ProductText>   Total </ProductText>
      <ProductPrice>$ {cart.total}</ProductPrice>
      </Item>
      <StripeCheckout 
      name ="MY STORE."
      image="https://www.color-stickers.com/4741-large_default/stickers-femme-shopping.jpg"
      BillingAddress
      shippingAddress
      description={`Your total is $${cart.total}`}
      amount={cart.total*100}
      token={onToken}
      stripeKey={KEY}
      >
      <Button>CheckOut</Button>
      </StripeCheckout>

      
      </ProductSummary>
      </Bottom>
      </Wrapper>
      <Footer/>
      </Container>
    )
}


export default (Cart);
