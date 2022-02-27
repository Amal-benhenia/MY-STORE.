import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcments from "../components/Announcments";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import {mobile} from '../responsive'

const Container = styled.div``

const Title = styled.h1`
margin: 30px;
${mobile({fontSize:"20px", fontWeight:"400"})};
`

const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
margin: 30px;`

const Filter = styled.div`
margin: 20px;
${mobile({margin:"0px 20px", display:"flex", flexDirection:"column"})};`

const Filtertext = styled.span`
font-size: 18px;
font-weight: 600;
margin-right: 20px;
${mobile({marginRight:"0px"})};
`
const Select = styled.select`
padding: 5px;
margin-right: 15px;
${mobile({marginTop:"10px"})};`

const Option = styled.option``

function ProductList() {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [filters, setFilters]=useState({});
  const [sort, setSort]=useState("newest");
  const handleFilters =(e)=>{
   const value= e.target.value;
   setFilters({
     ...filters,
     [e.target.name]:value,
   })
  }
  console.log(filters)
  return (
   <div>
  <Container>
  <Navbar/>
  <Announcments/>
  <Title>{category}</Title>
  <FilterContainer>
  <Filter>
<Filtertext>Filter products: </Filtertext>
  <Select name="color" onChange={handleFilters}>
            <Option>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>gray</Option>
            <Option>beige</Option>
            <Option>red</Option>
            <Option>pink</Option>
            <Option>light blue</Option>
            <Option>dark blue</Option>
            <Option>yellow</Option>
            <Option>orange</Option>
            <Option>green</Option>
            
  </Select>
  <Select name="size" onChange={handleFilters}>
  <Option>Size</Option>
  <Option>S</Option>
  <Option>M</Option>
  <Option>L</Option>
  <Option>XL</Option>
</Select>
  </Filter>
  <Filter>
  <Filtertext>Sort products: </Filtertext>
  <Select  onChange={e=>setSort(e.target.value)}>
  <Option value="newest">Price</Option>
  <Option value="asc"> Highest</Option>
  <Option value="desc">Lowest</Option>
</Select>
  </Filter>
  </FilterContainer>
  <Products category={category} filters={filters} sort={sort}/>
  <Newsletter/>
  <Footer/>
  </Container>
  </div>   
  )
}

export default ProductList;
