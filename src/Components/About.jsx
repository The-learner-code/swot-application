import React from 'react'
import '../Styles/Home.css'
import about_img from '../Assets/About.jpg';

const Aboutus = () => {
  return (
    <div className='aboutuslp'>
      <div className='about-left'>
        <img src={about_img} alt="" className='about-img' />
      </div>
      <div className='about-right'>
      <h2>Welcome to Rental Ease</h2>
        <p>At Rental Ease, we are dedicated to providing a seamless and reliable vehicle rental experience. Established with a vision to make transportation accessible and convenient, Rental Ease has grown into a trusted name in the vehicle rental industry.</p>
        <p>Our mission is to offer a diverse fleet of well-maintained vehicles, ranging from compact cars to luxury sedans, to meet the varied needs of our customers. With a focus on customer satisfaction, we ensure a hassle-free rental process, from booking to return.</p>
        <p>Join us at Rental Ease and discover the freedom of mobility with our efficient and user-friendly rental management system. Thank you for choosing Rental Ease – your journey starts here!</p>
      </div>
    </div>
  )
}

export default Aboutus