import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import About from '../Components/About'
import Title from '../Components/Title'
import Contacts from '../Components/ContactUs'
import Footer from '../Components/Footer'

const Homepage = () => {
  return (
    <div>
        <Navbar />
        <Hero/>
        <div className='container'>
        <About/>
        <Title subtitle='Contact Us' title='Get Connected' />
        <Contacts/>
        <Footer/>
        </div>

    </div>
  )
}

export default Homepage