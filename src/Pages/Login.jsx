// Importing necessary modules from React, React Router, and Firebase
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { toast, toastContainer } from '../toast';
import { doc, updateDoc } from "firebase/firestore";
// Importing the CSS file for styling the Login component
import '../styles/Login.css';

// Defining the LoginForm functional component
const LoginForm = () => {
    // Using useNavigate hook to programmatically navigate to different routes
    const navigate = useNavigate();
    // Defining state variables for email, password, and password visibility
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Function to reset the form fields
    const resetForm = () => {
        setEmail("");
        setPassword("");
    };

    // Function to handle form submission for login
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Signing in the user with email and password
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

            // Updating the lastSignInTime in AuthDetails collection
            const authDetailsRef = doc(db, "AuthDetails", email);
            await updateDoc(authDetailsRef, {
                lastSignInTime: timestamp
            });

            // Showing success toast message
            toast.success("User logged in successfully");
            setTimeout(() => {
                if (email === "vrmsrentalease@gmail.com") {
                    navigate('/ListOfUser');
                } else {
                    navigate('/Features');
                }
            }, 2000);
            resetForm();
        } catch (error) {
            // Showing error toast message if login fails
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(`Login Unsuccessful. Error code: ${errorCode}, Error message: ${errorMessage}`);
            resetForm();
        }
    };

    // Function to handle forgot password functionality
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            toast.error("Please enter your email address to reset password.");
            resetForm();
            return;
        }

        try {
            // Checking if the email exists in the AuthDetails collection
            const q = query(collection(db, "AuthDetails"), where("Email_id", "==", trimmedEmail));
            const querySnapshot = await getDocs(q);
            const querySnapshotList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log(querySnapshotList);
            if (querySnapshot.empty) {
                toast.error("Error sending password reset email: User is not registered");
                resetForm();
                return;
            }

            // Sending password reset email
            await sendPasswordResetEmail(auth, trimmedEmail);
            toast.success("Password reset email sent successfully.");
            resetForm();
        } catch (error) {
            // Showing error toast message if password reset fails
            toast.error(`Error sending password reset email: ${error.message}`);
            resetForm();
        }
    };

    return (
        <div className='l-body'>
            {/* Rendering the toast container for showing toast messages */}
            {toastContainer}
            {/* Button to navigate back to the Home page */}
            <div className="l-back">
                <button onClick={() => navigate('/')} className="l-button-back">Back to Home</button>
            </div>
            {/* Main container for the login form */}
            <div className="l-wrapper">
                <form className='l-form' onSubmit={handleSubmit} autoComplete="off">
                    <h2 className='l-h2'>Login</h2>
                    {/* Email input field */}
                    <div className="l-input-field">
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label>Enter your email</label>
                    </div>
                    {/* Password input field */}
                    <div className="l-input-field">
                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label>Enter your password</label>
                    </div>
                    {/* Section for password visibility toggle and forgot password link */}
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
                        <p onClick={handleForgotPassword}>Forgot password?</p>
                    </div>
                    {/* Login button */}
                    <button type="submit" className='l-button'>Log In</button>
                    {/* Link to navigate to the Register page */}
                    <div className="register">
                        <p onClick={() => navigate('/RegisterPage')}>Don't have an account? Click Here...!</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Exporting the LoginForm component to be used in other parts of the application
export default LoginForm;
