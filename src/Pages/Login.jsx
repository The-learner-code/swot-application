import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { toast, toastContainer } from '../toast';
import { doc, updateDoc } from "firebase/firestore";
import '../styles/Login.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const resetForm = () => {
        setEmail("");
        setPassword("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

            // Update the lastSignInTime in AuthDetails collection
            const authDetailsRef = doc(db, "AuthDetails", email);
            await updateDoc(authDetailsRef, {
                lastSignInTime: timestamp
            });

            toast.success("User logged in successfully");
            setTimeout(() => {
                if (email === "vrmsrentalease@gmail.com") {
                    navigate('/ListOfUser');
                } else { navigate('/Features'); }
            }, 2000);
            resetForm();
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(`Login Unsuccessful. Error code: ${errorCode}, Error message: ${errorMessage}`);
            resetForm();
        }

    };


    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            toast.error("Please enter your email address to reset password.");
            resetForm();
            return;
        }

        try {
            // Check if email exists in the AuthDetails collection
            const q = query(collection(db, "AuthDetails"), where("Email_id", "==", trimmedEmail));
            const querySnapshot = await getDocs(q);
            const querySnapshotlist = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log(querySnapshotlist)
            if (querySnapshot.empty) {
                toast.error("Error sending password reset email: User is not registered");
                resetForm();
                return;
            }

            await sendPasswordResetEmail(auth, trimmedEmail);
            toast.success("Password reset email sent successfully.");
            resetForm();
        } catch (error) {
            toast.error(`Error sending password reset email: ${error.message}`);
            resetForm();
        }
    };

    return (
        <div className='l-body'>
            {toastContainer}
            <div className="l-back">
                <button onClick={() => navigate('/')} className="l-button-back">Back to Home</button>
            </div>
            <div className="l-wrapper">
                <form className='l-form' onSubmit={handleSubmit} autoComplete="off">
                    <h2 className='l-h2'>Login</h2>
                    <div className="l-input-field">
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label>Enter your email</label>
                    </div>
                    <div className="l-input-field">
                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label>Enter your password</label>
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
                        <p onClick={handleForgotPassword} >Forgot password?</p>
                    </div>
                    <button type="submit" className='l-button'>Log In</button>
                    <div className="register">
                        <p onClick={() => navigate('/RegisterPage')}>Don't have an account? click Here...!</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
