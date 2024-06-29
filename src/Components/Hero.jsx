import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css';
import image1 from '../Assets/image1.png';
import image3 from '../Assets/image3.png';
import image7 from '../Assets/image7.jpg';
import image9 from '../Assets/image9.jpg';

const Hero = () => {
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % 4);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const images = [image1, image3, image7, image9];

    return (
        <div className='hero' style={{ backgroundImage: `url(${images[currentImage]})` }}>
            <div className="hero-text">
                <p>Your Journey,</p>
                <p>Our Wheels</p>
                <button className='reg-btn' onClick={() => navigate('/Register')}>Register To Ride</button>
            </div>
        </div>
    )
}

export default Hero;