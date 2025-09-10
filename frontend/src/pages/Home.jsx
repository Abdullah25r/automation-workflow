import React from 'react'
import Carousel from '../components/Carousel'
import Productsheading from '../components/Productsheading'
import ExploreProduct from '../components/ExploreProduct' 
import Extras from '../components/Extras'
import Gift from '../components/Gift'
import Watches from '../components/Watches'
import Testimonial from '../components/Testimonial'


function Home() {
  return (
    <div className = 'relative'>
      <Carousel />
      <Productsheading />
      <ExploreProduct />
      <Extras />
      <Gift />
      <Watches />
      <Testimonial/>
    </div>
  )
}

export default Home