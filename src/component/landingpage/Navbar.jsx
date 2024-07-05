import { useEffect, useState } from 'react'; // Hook
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
import '../../styles/Home.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [fixed, setfixed] = useState(false);
    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            window.scrollY > 60 ? setfixed(true) : setfixed(false);
        })
    },[]);
    return (
        <nav className={`lpcontainer ${fixed ? 'lpdark-nav' : ''}`}>
            <h1 className='lptext'>Rental Ease</h1>
            <ul>
                <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
                <li><Link to='about' smooth={true} offset={-130} duration={500}>About us</Link></li>
                <li onClick={() => navigate('/LoginPage')}>Login</li>
                <li onClick={() => navigate('/ContactPage')}>Contact Us</li>
            </ul>
        </nav>
    )
}

export default Navbar