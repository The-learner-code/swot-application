import React, { useEffect, useState } from 'react';
import '../Styles/Home.css';
import { useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.png';
import { Link } from 'react-scroll';

const Navbar = () => {
    const navigate = useNavigate();
    const [fixed, setfixed] = useState(false);
    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            window.scrollY > 50 ? setfixed(true) : setfixed(false);
        })
    },[]);
    return (
        <nav className={`container ${fixed ? 'dark-nav' : ''}`}>
            <img src={logo} alt="" className='lp-logo' />
            <ul>
                <li><Link to='hero-lp' smooth={true} offset={0} duration={500}>Home</Link></li>
                <li><Link to='aboutuslp' smooth={true} offset={-150} duration={500}>About us</Link></li>
                <li onClick={() => navigate('/Login')}>Login</li>
                <li><Link to='contactlp' smooth={true} offset={-260} duration={500}>Contact us</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar