import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import '../Styles/features.css'

const UserDashboard = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('logged Out successfully....!');
            setTimeout(() => {
                navigate('/');
            }, 3000); // Delay of 3 seconds
        } catch (error) {
            toast.error('Error logging out:', error);
        }
    };

    return (
        <div className="features-container">
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div> <button className="btn-lo" onClick={handleLogout}>LogOut</button></div>
            <h1>Solution Suite </h1>
            <div className="row">
                <div className="features" onClick={() => navigate('/UserProfile')}>
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
            <div className="guideline">
                <strong>Guidelines must be followed...!</strong>
                <p>Requests should be routed to the appropriate approver based on the user's department or role.</p>
                <p>Approvers should receive notifications of new requests via email or system alerts.</p>
                <p>Approvers can approve, reject, or request modifications to the vehicle request.</p>
                <p>Once approved, the requester is notified, and the vehicle is reserved.</p>
            </div>
        </div>
    );
};


export default UserDashboard;