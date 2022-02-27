import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons"
import styled from "styled-components"
import { sliderItems } from "../data"
import { useState } from "react";
import {mobile} from '../responsive';
import {HashLink as Link} from 'react-router-hash-link'

const Container = styled.div`
width:100%;
height: 90vh;
display: flex;
position: relative;
overflow: hidden;
${mobile({ display: "none"})};

`
const Arrow = styled.div`
height:50px;
width:50px;
background-color:white;
border-radius:50%;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
top: -10%;
bottom: 0;
left: ${ (props) => props.direction === "left" && "10px"};
right: ${(props) => props.direction === "right" && "10px"};
margin: auto;
cursor: pointer;
opacity: 0.5;
z-index: 2;

`; 
const Wrapper = styled.div`
height:100%;
display:flex;
transition: all 1.5s ease;
transform: translateX( ${(props)=> props.slideIndex * -100}vw);
`;
const Slide = styled.div`
width: 100vw;
height:100vh;
display: flex;
align-items:center;
background-color: ${(props) => props.bg};

`;
const ImageContainer = styled.div`
height: 90%;
flex:1;
margin-top: "10px"

`;
const Image = styled.img`
height: 90%;

`
const InfosContainer = styled.div`
flex:1;
padding: 50px;
`;
const Title = styled.h1`
font-size: 60px;
`
const Description = styled.p`
margin: 50px 0px;
font-size:20px;
font-weight: 600;
letter-spacing: 3px;


`;
const Button = styled.button`
padding: 10px;
font-size: 20px;
background-color: transparent;
cursor: pointer;
`;
export default function Slider() {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick =(direction)=>{
        if (direction === "left") {
          setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2);
        } else {
          setSlideIndex(slideIndex < 2 ? slideIndex+1: 0);
        }
      
    }

    return (
        <Container >
        <Arrow direction="left" onClick={()=> handleClick("left")} >
            <ArrowLeftOutlined/>
        </Arrow> 
           <Wrapper slideIndex={slideIndex}>
               {sliderItems.map((item)=> 
                
            <Slide bg={item.bg} key ={item.id} >
             <ImageContainer>
               
                 <Image src={item.img}/>
             </ImageContainer>
             <InfosContainer>
               <Title>{item.title}</Title>
               <Description>{item.desc}</Description>
               <Link to='#products'>
               <Button> Show now </Button>
               </Link>
             </InfosContainer>
           </Slide>
          )}
           </Wrapper>
           <Arrow direction='right' onClick={() => handleClick("right")}>
           <ArrowRightOutlined/>
       </Arrow> 
           
        </Container>
    )
}
