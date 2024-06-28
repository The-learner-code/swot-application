import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import About from '../Components/About'
import Footer from '../Components/Footer'

const Homepage = () => {
  return (
    <div>
        <Navbar />
        <Hero/>
        <div className='container'>
        <About/>
        <Footer/>
        </div>

    </div>
  )
}

export default Homepage