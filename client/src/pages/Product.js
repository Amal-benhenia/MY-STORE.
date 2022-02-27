import { Add, Remove } from "@material-ui/icons";
import { useLocation} from "react-router-dom";
import styled from "styled-components";
import Announcments from "../components/Announcments";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { publicRequest } from "../requestMethods";
import {mobile} from '../responsive';
import { useEffect, useState  } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { addHandler } from "../redux/actions/cartAction";
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom'
import {connect} from "react-redux"



const Container = styled.div``

const Wrapper = styled.div`
padding: 50px;
display: flex;
${mobile({padding:"10px", flexDirection:"column"})};
`

const ImgContainer = styled.div`
flex: 1;`

const Image = styled.img`
width: 100%;
height: 90vh;
object-fit: cover;

${mobile({height:"50vh"})};`

const Info = styled.div`
flex:1;
padding: 0px 50px;
${mobile({padding:"10px"})};`

const Title = styled.h1`
font-weight: 300;`

const Description = styled.p`
margin: 20px 0px`


const Price = styled.span`
font-weight: 100;
font-size: 30px;`

const FilterContainer = styled.div`
width: 40%;
margin: 25px 0px;
display: flex;
justify-content: space-between;
${mobile({width:"100%"})};
`

const Filter = styled.div`
display: flex;
align-items: center;
`
const FilterTitle = styled.span`
font-size: 18px;
font-weight: 250;
`

const FilterColor = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
border: 0.5px solid gray;
background-color: ${(props) => props.color};
margin: 0px 5px;
cursor: pointer;
`
const FilterSize = styled.select`
margin-left: 10px;
padding: 3px;
`
const Size = styled.option`

`
const AddContainer = styled.div`
width: 40%;
display: flex;
align-items: center;
justify-content: space-between;
${mobile({width:"100%"})};
`

const AmountContainer = styled.div`
display: flex;
align-items: center;
font-weight:600;`

const Amount = styled.span`
width:30px;
height:30px;
border-radius:10px;
border: 1.5px solid royalblue ;
display: flex;
align-items: center;
justify-content: center`

const Button = styled.button`
padding: 10px;
border: 2px solid royalblue ;
background-color: white;
cursor : pointer;
font-weight: 500;
border-radius:10px;
&: hover{
    background-color: #f8f4f4
}
`
function Product() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity]= useState(0);
  const [color, setColor]= useState("");
  const [size, setSize]= useState("");
  const dispatch = useDispatch();
  


  useEffect(()=>{
      const getProduct = async ()=>{
          try {
              const res= await publicRequest.get("/products/find/" + id)
              setProduct(res.data)
          } catch (error) {
              
          }
      }
      getProduct()
  }, [id])

  const handleQuantity = (type)=>{
      if (type === "dec"){
       quantity >1 &&  setQuantity(quantity - 1);
      } else if (type === "inc") {
        setQuantity(quantity +1);
      }
  }
  const products = useSelector((state) => state);
  console.log(products);
  const handleClick= ()=>{
     dispatch(
      addHandler({...product, quantity, price: product.price*quantity, size})
     )
    }
    console.log(quantity)
return (
      <Container>
      <Navbar/>
      <Announcments/>
      <Wrapper>
      <ImgContainer>
      <Image src={product?.img}/>
      </ImgContainer>
      <Info>
      <Title>{product?.title}</Title>
      <Description>{product?.desc}</Description>
      <Price> $ {product?.price}</Price>
      <FilterContainer>
      <Filter>
      <FilterTitle>Color</FilterTitle>
      {product.color?.map((c)=>(
        <FilterColor color={c} key= {c} onChange={()=>setColor(c)}  />
      ))}
      </Filter>
      <Filter>
      <FilterTitle>Size</FilterTitle>
      <FilterSize onChange={(e)=>setSize(e.target.value)} >
      {product.size?.map((s)=>(
        <Size key={s}>{s}</Size>
      ))}
      </FilterSize>
      </Filter>
      </FilterContainer>
      <AddContainer>
      <AmountContainer>
      <Remove onClick={()=> handleQuantity("dec") }/>
      <Amount>{quantity}</Amount>
      <Add onClick={()=> handleQuantity("inc")} />
      </AmountContainer>
   <Link path to ='/cart'>
      <Button onClick={handleClick} >Add to Cart</Button>
      </Link>
      </AddContainer>
      </Info>
      </Wrapper>
      <Newsletter/>
      <Footer/>
      </Container>
      )
}
export default  (Product);
