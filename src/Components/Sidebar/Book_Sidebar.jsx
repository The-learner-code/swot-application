import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase";
import './sidebar.css';
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GarageIcon from '@mui/icons-material/Garage';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const User_Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out successfully!");
            setTimeout(() => {
                navigate('/LoginAndRegister'); 
            }, 2000);
        } catch (error) {
            console.error("Error logging out: ", error);
            toast.error("Error logging out. Please try again.");
        }
    };

    return (
        <div className="sidebar">
           <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="top">
                <span className="logo">Rent Ease</span>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <li onClick={() => navigate('/ViewVehicle')}>
                        <GarageIcon className='icon' />
                        <span>View Vehicle</span>
                    </li>
                    <li onClick={() => navigate('/')}>
                        <VisibilityIcon className='icon' />
                        <span>View Booking</span>
                    </li>
                    <li onClick={() => navigate('/Features')}>
                        <ArrowBackIcon className='icon' />
                        <span>Back to Suite</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <ul>
                    <li onClick={handleLogout}>
                        <ExitToAppIcon className='icon' />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default User_Sidebar;