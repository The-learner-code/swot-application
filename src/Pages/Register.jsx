import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; // Import auth and db instances from firebase configuration
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import createUserWithEmailAndPassword function from Firebase Authentication
import { setDoc, doc } from "firebase/firestore"; // Import setDoc and doc functions from Firebase Firestore
import { toast, toastContainer } from '../toast';
import '../styles/Register.css';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [conpass, setConpass] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const resetForm = () => {
        setEmail("");
        setFullName("");
        setAddress("");
        setPhoneNumber("");
        setPassword("");
        setConpass("");
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return re.test(String(email).toLowerCase());
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
                Phone_Number: phoneNumber,
                createdAt: timestamp,
                lastSignInTime: timestamp,
                type: userType
            });

            toast.success(`${email} Profile Created successfully!`); // Show success notification
            setTimeout(() => {
                navigate('/LoginPage'); // Navigate to login page after 3 seconds
            }, 3000); // Delay of 3 seconds
            resetForm(); // Reset form inputs
        } catch (error) {
            toast.error(`Registration Unsuccessful. Error code: ${error.message}`); // Show error notification
            console.log(error);
            resetForm(); // Reset form inputs
        }
    };

    return (
        <div className='r-body'>
            {toastContainer}
            <div className="r-back">
                <button onClick={() => navigate('/')} className="l-button-back">Back to Home</button>
            </div>
            <div className="r-wrapper">
                <form className='r-form' onSubmit={handleSubmit} autoComplete="off">
                    <h2 className='r-h2'>Register Here..!</h2>
                    <div className="r-input-field">
                        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}required />
                        <label>Enter your name</label>
                    </div>
                    <div className="r-input-field">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label>Enter your email</label>
                    </div>
                    <div className="r-input-field">
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        <label>Enter your full address and pincode</label>
                    </div>
                    <div className="r-input-field">
                        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        <label>Enter your phone no</label>
                    </div>
                    <div className="r-input-field">
                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label>Enter your password</label>
                    </div>
                    <div className="r-input-field">
                        <input type={showPassword ? "text" : "password"} value={conpass} onChange={(e) => setConpass(e.target.value)} required />
                        <label>Conform your password</label>
                    </div>
                    <div className="forget">
                        <label htmlFor="showPassword">
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={togglePasswordVisibility}
                            />
                            <p>Show password</p>
                        </label>
                    </div>
                    <button type="submit" className='l-button'>Register</button>
                    <div className="login">
                        <p onClick={() => navigate('/LoginPage')}>Already Registered.? click Here...!</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
