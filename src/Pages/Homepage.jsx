import Navbar from '../component/landingpage/Navbar';
import Hero from '../component/landingpage/Hero';
import About from '../component/landingpage/About';
import Footer from '../component/landingpage/Footer';
import '../styles/Home.css';

const Homepage = () => {
  return (
    <div className='hompage'>
      <Navbar />
      <Hero />
      <div className="lpcontainer">
        <About />
        <Footer />
      </div>
    </div>
  )
}

export default Homepage