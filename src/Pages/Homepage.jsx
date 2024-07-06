// Importing the necessary components for the Homepage
import Navbar from '../component/landingpage/Navbar';
import Hero from '../component/landingpage/Hero';
import About from '../component/landingpage/About';
import Footer from '../component/landingpage/Footer';
// Importing the CSS file for styling the Homepage
import '../styles/Home.css';

// Defining the Homepage functional component
const Homepage = () => {
  return (
    // Main container for the Homepage
    <div className='homepage'>
      {/* Rendering the Navbar component */}
      <Navbar />
      {/* Rendering the Hero component */}
      <Hero />
      {/* Container for About and Footer components */}
      <div className="lpcontainer">
        {/* Rendering the About component */}
        <About />
        {/* Rendering the Footer component */}
        <Footer />
      </div>
    </div>
  )
}

// Exporting the Homepage component to be used in other parts of the application
export default Homepage;
