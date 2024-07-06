// Importing necessary modules from React and React Router
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Importing images for the hero section
import image1 from '../../Assets/image1.png';
import image3 from '../../Assets/image3.png';
import image7 from '../../Assets/image7.jpg';
import image9 from '../../Assets/image9.jpg';

// Importing the CSS file for styling the Home component
import '../../styles/Home.css';

// Defining the Hero functional component
const Hero = () => {
    // Using useNavigate hook to programmatically navigate to different routes
    const navigate = useNavigate();
    // Defining a state variable to track the current image index
    const [currentImage, setCurrentImage] = useState(0);

    // Using useEffect hook to set up an interval for image rotation
    useEffect(() => {
        // Setting an interval to change the image every 5 seconds
        const interval = setInterval(() => {
            // Updating the current image index, cycling through the array of images
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);

        // Cleaning up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    // Array of images to be used in the hero section
    const images = [image1, image3, image7, image9];

    return (
        // Main container for the hero section with dynamic background image
        <div className='hero' style={{ backgroundImage: `url(${images[currentImage]})` }}>
            {/* Container for hero text and button */}
            <div className="hero-text">
                <p>Your Journey,</p>
                <p>Our Wheels</p>
                {/* Button to navigate to the Register page */}
                <button className='reg-btn' onClick={() => navigate('/RegisterPage')}>Register To Ride</button>
            </div>
        </div>
    )
}

// Exporting the Hero component to be used in other parts of the application
export default Hero;
