import React from 'react'
import Header from "../components/Layout/Header.jsx"
import Hero from "../components/Route/Hero/Hero.jsx"
import Categories from "../components/Route/Categories/Categories.jsx"
import BestDeals from "../components/Route/BestDeals/BestDeals.jsx"
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct.js"
import Events from "../components/Events/Events.jsx";

const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1}/>
        <Hero />
        <Categories />
        <BestDeals />
        <Events/>
        <FeaturedProduct />

    </div>
  )
}

export default HomePage