// Import necessary modules and components
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import { auth } from "../../firebase"; // Firebase authentication
import './sidebar.css'; // Sidebar CSS for styling
import { signOut } from "firebase/auth"; // Firebase sign out function
import { toast, toastContainer } from '../../toast'; // Custom toast notifications
import 'react-toastify/dist/ReactToastify.css'; // CSS for toast notifications
import GarageIcon from '@mui/icons-material/Garage'; // Icon for adding vehicles
import VisibilityIcon from '@mui/icons-material/Visibility'; // Icon for viewing vehicle details
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Icon for logout
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Icon for navigating back to suite

const Owner_Sidebar = () => {
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
                    <li onClick={() => navigate('/AddVehiclePage')}> {/* Navigate to add vehicle */}
                        <GarageIcon className='icon' /> {/* Icon for adding vehicles */}
                        <span>Add Vehicle</span>
                    </li>
                    <li onClick={() => navigate('/ViewVehiclePage')}> {/* Navigate to vehicle details */}
                        <VisibilityIcon className='icon' /> {/* Icon for vehicle details */}
                        <span>Vehicle Details</span>
                    </li>
                    <li onClick={() => navigate('/FeaturesPage')}> {/* Navigate back to suite */}
                        <ArrowBackIcon className='icon' /> {/* Icon for navigating back to suite */}
                        <span>Back to Suite</span>
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

export default Owner_Sidebar;
