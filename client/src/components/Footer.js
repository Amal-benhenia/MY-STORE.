import {Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons";
import styled from "styled-components";
import {mobile} from '../responsive'
import { Link } from 'react-router-dom'

const Container = styled.div`
display: flex;
${mobile({ flexDirection: "column"})};

`
const Left = styled.div`
flex:1;
display: flex;
flex-direction: column;
padding: 25px;
`
const Logo = styled.h1``
const Description = styled.p`
margin: 20px  0px;`

const SocialmediaContainer = styled.div`
display: flex;
`

const Icon = styled.div`
width: 30px
height: 30px
display: flex;
align-items: center;
justify-content: center;
margin-right: 20px;`
const Center = styled.div`
flex:1;
${mobile({ display: "none"})}
`
const Title = styled.h3`
margin-top:30px;
margin-bottom: 30px;`




const ItemList = styled.li`
width: 50%;
margin-bottom: 10px;`

const Right = styled.div`
flex:1;

margin-left: 450px;
`
const Contacts = styled.div`
margin-bottom: 20px;
display: flex;
align-items: center;`

const Payment = styled.img`
width: 30%;`

function Footer() {
  return (
  <Container>
  <Left>
  <Logo>My STORE.</Logo>
  <Description>We beleive the best way to deliver a great user experience is by deeply underestanding what people want and love. Then deliver the features, messages and content that are most helpful, relevant and timely. That's what makes our users happy and loyal. My store strives to deliver the tools and support that help customers have that great experience. We want our customers to be happy so when they are happy, we are happy. </Description>
  <SocialmediaContainer>
  <Icon>
  <Facebook/>
  </Icon>
  <Icon>
  <Instagram/>
  </Icon>
  <Icon>
  <Twitter/>
  </Icon>
  <Icon>
  <Pinterest/>
  </Icon>
  </SocialmediaContainer>
  </Left>
  
  <Right>
  <Title>Contacts</Title>
  <Contacts>
  <Room style={{marginRight:"10px"}}/>
  5000 Street Ibn Al Jazar Monastir
  </Contacts>
  <Contacts>
  <Phone style={{marginRight:"10px"}}/>
  +216 28 639 221
  </Contacts>
  <Contacts>
  <MailOutline style={{marginRight:"10px"}}/>
  ambenhenia@gmail.com
  </Contacts>
  <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"/>
  </Right>
  </Container>
  )  
}

export default Footer;
