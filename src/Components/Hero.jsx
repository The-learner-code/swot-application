import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css';
import image1 from '../Assets/image1.png';
import image2 from '../Assets/image2.png';
import image3 from '../Assets/image3.png';

const Hero = () => {
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % 3);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const images = [image1, image2, image3];

    return (
        <div className='hero-lp' style={{ backgroundImage: `url(${images[currentImage]})` }}>
            <div className="hero-lp-text">
            <h1>Your Journey, Our Wheels</h1>
                <button className='btn' onClick={() => navigate('/Register')}>Register To Explore</button>
            </div>
        </div>
    )
}

export default Hero;