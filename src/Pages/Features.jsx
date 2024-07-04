import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { signOut } from 'firebase/auth';
import { toast, toastContainer } from '../toast';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import '../Styles/features.css';

const UserDashboard = () => {
    const navigate = useNavigate();
    const [showWelcomeModal, setShowWelcomeModal] = useState(true);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out successfully!');
            setTimeout(() => {
                navigate('/');
            }, 3000); // Delay of 3 seconds
        } catch (error) {
            toast.error('Error logging out:', error);
        }
    };

    const closeWelcomeModal = () => {
        setShowWelcomeModal(false);
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
                    <button onClick={closeWelcomeModal}>Reed, Accept to continue...!</button>
                </div>
            )}
            {toastContainer}
            <div> <button className="btn-lo" onClick={handleLogout}>LogOut</button></div>
            <div className='feat-container'>
                <h1>Solution Suite</h1>
                <div className="row">
                    <div className="features" onClick={() => navigate('/UpdateVehicle')}>
                        <PersonIcon className="fa-icon" />
                        <h2>Add vehicle for rental</h2>
                        <p>Refresh your details in a snap!</p>
                    </div>
                    <div className="features" onClick={() => navigate('/ViewVehicle')}>
                        <EditIcon className="fa-icon" />
                        <h2>Move for Booking</h2>
                        <p>See your profile, anytime, anywhere.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
