// Import necessary modules and components from various libraries
import { useState } from "react"; // Import useState hook from React
import { auth, db } from '../firebase'; // Import auth and db instances from firebase configuration
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import createUserWithEmailAndPassword function from Firebase Authentication
import { setDoc, doc } from "firebase/firestore"; // Import setDoc and doc functions from Firebase Firestore
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from React Router
import { toast, toastContainer } from '../toast'; // Import ToastContainer and toast from react-toastify for notifications
import '../Styles/loginandregister.css'; // Import custom CSS for styling
import { IconButton, InputAdornment, TextField } from '@mui/material'; // Import components from Material-UI
import VisibilityIcon from '@mui/icons-material/Visibility'; // Import visibility icon for password field
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; // Import visibility off icon for password field

// Define the AccountCreation component
const AccountCreation = () => {
    // Define state variables to manage form inputs
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [state, setState] = useState("");
    const [password, setPassword] = useState("");
    const [conpass, setConpass] = useState("");
    const navigate = useNavigate(); // Initialize navigate function for navigation

    const [showPassword, setShowPassword] = useState(false); // State variable to toggle password visibility

    // Function to toggle password visibility
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // Function to reset form inputs
    const resetForm = () => {
        setEmail("");
        setFullName("");
        setAddress("");
        setPhoneNumber("");
        setState("");
        setPassword("");
        setConpass("");
    };

    // Function to validate email format
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .endsWith('@gmail.com');
    };

    // Function to validate phone number format
    const validatePhoneNumber = (phoneNumber) => {
        return /^\d{10}$/.test(phoneNumber);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Validate form inputs and show error messages if invalid
        if (!validateEmail(email.trim()) || email.trim() === "" || email.trim() === " ") {
            toast.error("Please enter a valid Email_id ending with @gmail.com...!");
            return;
        }
        if (fullName.trim() === "") {
            toast.error("Full Name should not be Empty...!");
            return;
        }
        if (address.trim() === "") {
            toast.error("Address should not be Empty...!");
            return;
        }
        if (!validatePhoneNumber(phoneNumber.trim())) {
            toast.error("Phone Number should be exactly 10 digits...!");
            return;
        }
        if (state.trim() === "") {
            toast.error("State should not be Empty...!");
            return;
        }
        if (password.trim() === "" || password.trim() === " " || password.trim().length < 6) {
            toast.error("Password should not be Empty or Blank or less than 6 characters...!");
            return;
        }
        if (conpass.trim() === "" || conpass.trim() === " " || conpass.trim().length < 6) {
            toast.error("Confirm Password should not be Empty or Blank or less than 6 characters...!");
            return;
        }
        if (conpass.trim() !== password.trim()) {
            toast.error("Password and Confirm Password do not match...!");
            return;
        }

        try {
            // Create a new user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
            console.log(userCredential);
            const authDetailsRef = doc(db, "AuthDetails", email); // Create a reference to the user's document in Firestore
            const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }); // Get current timestamp
            const userType = email === "vrmsrentalease@gmail.com" ? "Admin" : "Vehicle_User"; // Determine user type based on email

            // Save user details in Firestore
            await setDoc(authDetailsRef, {
                Name: fullName,
                Email_id: email,
                Address: address,
                State: state,
                Phone_Number: phoneNumber,
                createdAt: timestamp,
                lastSignInTime: timestamp,
                type: userType
            });

            toast.success(`${email} Profile Created successfully!`); // Show success notification
            setTimeout(() => {
                navigate('/Login'); // Navigate to login page after 3 seconds
            }, 3000); // Delay of 3 seconds
            resetForm(); // Reset form inputs
        } catch (error) {
            toast.error(`Registration Unsuccessful. Error code: ${error.message}`); // Show error notification
            console.log(error);
            resetForm(); // Reset form inputs
        }
    };

    return (
        <div className='Register-cotainer'>
           {toastContainer}
            <div className="Back">
                <button onClick={() => navigate('/')} className="link">Back to Home</button>
            </div>
            <div className="form-box">
                <h1>Enroll Your Detail...!</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <div className='input-field'>
                            <TextField style={{ width: '100%' }} type="text" placeholder='Enter Your Sweet Name' value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                        </div>
                        <div className='input-field'>
                            <TextField style={{ width: '100%' }} type="email" placeholder='Enter Your Email_id' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className='input-field'>
                            <TextField style={{ width: '100%' }} type="text" placeholder='Enter Your Address and District' value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </div>
                        <div className='input-field'>
                            <TextField style={{ width: '100%' }} type="text" placeholder='Enter Your State' value={state} onChange={(e) => setState(e.target.value)} required />
                        </div>
                        <div className='input-field'>
                            <TextField style={{ width: '100%' }} type="tel" placeholder='Enter Your Mobile Number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        </div>
                        <div className="input-field">
                            <TextField
                                style={{ width: '100%' }}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleTogglePasswordVisibility}
                                            >
                                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                        <div className="input-field">
                            <TextField
                                style={{ width: '100%' }}
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm Your password"
                                value={conpass}
                                onChange={(e) => setConpass(e.target.value)}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleTogglePasswordVisibility}
                                            >
                                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                        <div className='btn-field'>
                            <button type="submit" className="btn-sub">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountCreation; // Export the AccountCreation component as the default export
