// Import necessary modules and components
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import { auth } from "../../firebase"; // Firebase authentication
import './sidebar.css'; // Sidebar CSS for styling
import { signOut } from "firebase/auth"; // Firebase sign out function
import { toast, toastContainer } from '../../toast'; // Custom toast notifications
import GarageIcon from '@mui/icons-material/Garage'; // Icon for list of users
import VisibilityIcon from '@mui/icons-material/Visibility'; // Icon for list of vehicles
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Icon for logout
import EventAvailableIcon from '@mui/icons-material/EventAvailable'; // Icon for booking confirmation
import AssessmentIcon from '@mui/icons-material/Assessment'; // Icon for booking report

const Admin_Sidebar = () => {
    const navigate = useNavigate(); // Initialize navigation hook

    // Function to handle user logout
    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out user using Firebase authentication
            toast.success("Logged out successfully!"); // Show success message
            setTimeout(() => {
                navigate('/LoginPage'); // Redirect to login page after 2 seconds
            }, 2000);
        } catch (error) {
            console.error("Error logging out: ", error); // Log any error to console
            toast.error("Error logging out. Please try again."); // Show error message
        }
    };

    return (
        <div className="sidebar">
           {toastContainer} {/* Container for toast notifications */}
            <div className="top">
                <span className="logo">Rent Ease</span> {/* Application logo */}
            </div>
            <hr />
            <div className="center">
                <ul>
                    <li onClick={() => navigate('/ListOfUserPage')}> {/* Navigate to list of users */}
                        <GarageIcon className='icon' /> {/* Icon for list of users */}
                        <span>List Of Users</span>
                    </li>
                    <li onClick={() => navigate('/ListOfVehiclePage')}> {/* Navigate to list of vehicles */}
                        <VisibilityIcon className='icon' /> {/* Icon for list of vehicles */}
                        <span>List Of Vehicles</span>
                    </li>
                    <li onClick={() => navigate('/UserRequestCompletionPage')}> {/* Navigate to booking confirmation */}
                        <EventAvailableIcon className='icon' /> {/* Icon for booking confirmation */}
                        <span>Booking Conformation</span>
                    </li>
                    <li onClick={() => navigate('/ReportPage')}> {/* Navigate to booking report */}
                        <AssessmentIcon className='icon' /> {/* Icon for booking report */}
                        <span>Booking Report</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <ul>
                    <li onClick={handleLogout}> {/* Trigger logout function */}
                        <ExitToAppIcon className='icon' /> {/* Icon for logout */}
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Admin_Sidebar;
