import { Send } from '@material-ui/icons';
import styled from 'styled-components';

const Container = styled.div`
height: 60vh;
background-color: #fcf5f5;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

`

const Title = styled.h1`
font-size: 60px;
margin-bottom: 20px;
`


const Description= styled.div`
font-size: 20px;
font-weight: 400;
margin-bottom: 20px;
`


const InputCont = styled.div`
width: 50%;
height: 40px;
background-color: white;
display: flex;
justify-content: space-between;
border: 1px solid lightgray;
`


const Input = styled.input`
border: none;
flex: 7;
padding-left: 25px;
`


const Button = styled.button`
flex:0.5;
border: none;
background-color:#008b8b;
color: white;
`


function Newsletter() {
  return (
  <Container>
  <Title>Newsletter</Title>
  <Description>Stay Informed of Our Special offers</Description>
  <InputCont>
  <Input placeholder="Your email address"/>
  <Button>
  <Send/>
  </Button>
  </InputCont>
  
  </Container>
  )
}

export default Newsletter;
