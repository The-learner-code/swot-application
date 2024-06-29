import { useEffect, useState } from 'react'; // Hook
import '../Styles/Home.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';

const Navbar = () => {
    const navigate = useNavigate();
    const [fixed, setfixed] = useState(false);
    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            window.scrollY > 60 ? setfixed(true) : setfixed(false);
        })
    },[]);
    return (
        <nav className={`container ${fixed ? 'dark-nav' : ''}`}>
            <h1 className='text'>Rental Ease</h1>
            <ul>
                <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
                <li><Link to='about' smooth={true} offset={-150} duration={500}>About us</Link></li>
                <li onClick={() => navigate('/Login')}>Login</li>
                <li onClick={() => navigate('/Contact_Us')}>Contact Us</li>
            </ul>
        </nav>
    )
}

export default Navbar