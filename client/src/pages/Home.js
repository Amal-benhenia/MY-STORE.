import React from 'react'
import Announcments from '../components/Announcments'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import Slider from '../components/Slider'
import { sliderItems } from "../data"



const Home = () => {
    return (
        <div>
           
           <Navbar/>
           <Announcments/>
           <Slider slides={sliderItems }/>
           <Categories/>
           <Products/>
           <Newsletter/>
           <Footer/>
        </div>
    )
}

export default Home

