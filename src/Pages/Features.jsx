import React, { useState } from 'react'; // Import React and useState hook for state management
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { auth } from "../firebase"; // Import Firebase authentication
import { signOut } from 'firebase/auth'; // Import signOut function from Firebase
import { toast, toastContainer } from '../toast'; // Import custom toast notifications
import PersonIcon from '@mui/icons-material/Person'; // Import Person icon
import EditIcon from '@mui/icons-material/Edit'; // Import Edit icon
import '../styles/Features.css'; // Import CSS for styling

const Features = () => {
    const navigate = useNavigate(); // Initialize navigation hook
    const [showWelcomeModal, setShowWelcomeModal] = useState(true); // State to control the display of the welcome modal

    // Function to handle user logout
    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out user using Firebase authentication
            toast.success('Logged out successfully!'); // Show success message
            setTimeout(() => {
                navigate('/'); // Redirect to the home page after a delay of 3 seconds
            }, 3000);
        } catch (error) {
            toast.error('Error logging out:', error); // Show error message
        }
    };

    // Function to close the welcome modal
    const closeWelcomeModal = () => {
        setShowWelcomeModal(false); // Set state to hide the modal
    };

    return (
        <div className="features-container">
            {showWelcomeModal && (
                <div className="welcome-modal">
                    <h2>Terms and Conditions</h2>

                    <h3>Vehicle Availability and Scheduling:</h3>
                    <p>Owners must provide accurate availability schedules. Withdrawals require one week's notice.</p>

                    <h3>Rental Rates:</h3>
                    <ul>
                        <p>Current rates:</p>
                        <li>4-Seater Car: ₹1,000/day</li>
                        <li>5-Seater Car: ₹1,200/day</li>
                        <li>Bike: ₹500/day</li>
                    </ul>

                    <h3>Vehicle Condition and Maintenance:</h3>
                    <p>Vehicles must be well-maintained and clean. Owners are responsible for timely repairs.</p>

                    <h3>Documentation:</h3>
                    <p>Upload and maintain registration, insurance, and PUC certificates.</p>

                    <h3>Rental Agreement:</h3>
                    <p>Agree to terms before booking, including rental period adherence.</p>

                    <h3>Vehicle Condition:</h3>
                    <p>Maintain vehicle condition during use and report damages promptly.</p>

                    <h3>Damage and Penalties:</h3>
                    <p>Users pay for damages incurred during use.</p>
                    <button onClick={closeWelcomeModal}>Read, Accept to continue...!</button> {/* Button to close the modal */}
                </div>
            )}
            {toastContainer} {/* Container for toast notifications */}
            <div> <button className="btn-lo" onClick={handleLogout}>LogOut</button></div> {/* Logout button */}
            <div className='feat-container'>
                <h1>Solution Suite</h1>
                <div className="row">
                    <div className="features" onClick={() => navigate('/AddVehiclePage')}> {/* Navigate to add vehicle page */}
                        <PersonIcon className="fa-icon" /> {/* Icon for adding vehicle */}
                        <h2>Add vehicle for rental</h2>
                        <p>Refresh your details in a snap!</p>
                    </div>
                    <div className="features" onClick={() => navigate('/ViewVehicle')}> {/* Navigate to view vehicle page */}
                        <EditIcon className="fa-icon" /> {/* Icon for viewing vehicle */}
                        <h2>Move for Booking</h2>
                        <p>See your profile, anytime, anywhere.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
