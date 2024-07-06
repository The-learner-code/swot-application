// Importing the image used in the About Us section
import about_img from '../../Assets/About.jpg';
// Importing the CSS file for styling the Home component
import '../../styles/Home.css'

// Defining the Aboutus functional component
const Aboutus = () => {
  return (
    // Main container for the About Us section
    <div className='about'>
      {/* Left section containing the image */}
      <div className='about-left'>
        {/* Displaying the image */}
        <img src={about_img} alt="About Rental Ease" className='about-img' />
      </div>
      {/* Right section containing the text content */}
      <div className='about-right'>
        {/* Heading for the About Us section */}
        <h3>ABOUT SERVICE</h3>
        <h2>Welcome to Rental Ease</h2>
        {/* Paragraphs describing the service */}
        <p>At Rental Ease, we are dedicated to providing a seamless and reliable vehicle rental experience. Established with a vision to make transportation accessible and convenient, Rental Ease has grown into a trusted name in the vehicle rental industry.</p>
        <p>Our mission is to offer a diverse fleet of well-maintained vehicles, ranging from compact cars to luxury sedans, to meet the varied needs of our customers. With a focus on customer satisfaction, we ensure a hassle-free rental process, from booking to return.</p>
        <p>Join us at Rental Ease and discover the freedom of mobility with our efficient and user-friendly rental management system. Thank you for choosing Rental Ease – your journey starts here!</p>
      </div>
    </div>
  )
}

// Exporting the Aboutus component to be used in other parts of the application
export default Aboutus
