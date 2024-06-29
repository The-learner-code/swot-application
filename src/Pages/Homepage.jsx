import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import About from '../Components/About'
import Footer from '../Components/Footer'
import Title from '../Components/Title';

const Homepage = () => {
  return (
    <div>
        <Navbar />
        <Hero/>
        <div className='container'>
        <Title title='Abouts Us' />
        <About/>
        <Footer/>
        </div>

    </div>
  )
}

export default Homepage