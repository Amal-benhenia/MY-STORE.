import styled from "styled-components"
import {mobile} from '../responsive'

const Container = styled.div`
background-color: burlywood;
height: 40px;
color: white;
display:flex;
align-items: center;
justify-content: center;
font-size: 15px;
font-weight: 500;
${mobile({ fontSize: "12px"})};


`

export default function Announcments() {
    return (
        <Container>
            We are pleased to announce the launch of our brand new website
        </Container>
            
    
    )
}
