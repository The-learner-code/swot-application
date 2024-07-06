// Importing necessary hooks from React and React Router
import { useEffect, useState } from 'react'; // Hook
import { useNavigate } from 'react-router-dom';
// Importing the Link component from react-scroll for smooth scrolling
import { Link } from 'react-scroll';
// Importing the CSS file for styling the Home component
import '../../styles/Home.css';

// Defining the Navbar functional component
const Navbar = () => {
    // Using useNavigate hook to programmatically navigate to different routes
    const navigate = useNavigate();
    // Defining a state variable to track whether the navbar should be fixed
    const [fixed, setFixed] = useState(false);

    // Using useEffect hook to add a scroll event listener
    useEffect(() => {
        // Adding a scroll event listener to the window object
        const handleScroll = () => {
            // Setting the navbar to fixed if the scroll position is greater than 60
            window.scrollY > 60 ? setFixed(true) : setFixed(false);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleaning up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        // Main container for the navbar with dynamic class based on the fixed state
        <nav className={`lpcontainer ${fixed ? 'lpdark-nav' : ''}`}>
            {/* Branding text */}
            <h1 className='lptext'>Rental Ease</h1>
            {/* Navigation links */}
            <ul>
                {/* Link to scroll to the Hero section */}
                <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
                {/* Link to scroll to the About Us section */}
                <li><Link to='about' smooth={true} offset={-130} duration={500}>About us</Link></li>
                {/* Link to navigate to the Login page */}
                <li onClick={() => navigate('/LoginPage')}>Login</li>
                {/* Link to navigate to the Contact Us page */}
                <li onClick={() => navigate('/ContactPage')}>Contact Us</li>
            </ul>
        </nav>
    )
}

// Exporting the Navbar component to be used in other parts of the application
export default Navbar;
