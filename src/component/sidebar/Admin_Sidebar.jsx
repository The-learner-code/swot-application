import { useNavigate } from 'react-router-dom';
import { auth } from "../../../drop/src/firebase";
import './sidebar.css';
import { signOut } from "firebase/auth";
import { toast, toastContainer } from '../../../drop/src/toast';
import 'react-toastify/dist/ReactToastify.css';
import GarageIcon from '@mui/icons-material/Garage';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Admin_Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out successfully!");
            setTimeout(() => {
                navigate('/Login');
            }, 2000);
        } catch (error) {
            console.error("Error logging out: ", error);
            toast.error("Error logging out. Please try again.");
        }
    };

    return (
        <div className="sidebar">
           {toastContainer}
            <div className="top">
                <span className="logo">Rent Ease</span>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <li onClick={() => navigate('/ListOfUser')}>
                        <GarageIcon className='icon' />
                        <span>List Of Users</span>
                    </li>
                    <li onClick={() => navigate('/ListOfVehicle')}>
                        <VisibilityIcon className='icon' />
                        <span>List Of Vehicles</span>
                    </li>
                    <li onClick={() => navigate('/RequestCompletion')}>
                        <EventAvailableIcon className='icon' />
                        <span>Booking Conformation</span>
                    </li>
                    <li onClick={() => navigate('/Report')}>
                        <AssessmentIcon className='icon' />
                        <span>Booking Report</span>
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

export default Admin_Sidebar;