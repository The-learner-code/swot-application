import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { toast, toastContainer } from '../toast';
import { doc, updateDoc } from "firebase/firestore";
import '../Styles/loginandregister.css';

import { IconButton, InputAdornment, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
      toast.error("Please enter your email address to reset password.", { autoClose: 2500 });
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
        toast.error("Error sending password reset email: User is not registered", { autoClose: 2500 });
        resetForm();
        return;
      }

      await sendPasswordResetEmail(auth, trimmedEmail);
      toast.success("Password reset email sent successfully.", { autoClose: 2500 });
      resetForm();
    } catch (error) {
      toast.error(`Error sending password reset email: ${error.message}`, { autoClose: 2500 });
      resetForm();
    }
  };

  return (
    <div className='Login-cotainer'>
    {toastContainer}
      <div className="Back">
        <button onClick={() => navigate('/')} className="link">Back to Home</button>
      </div>
      <div className="form-box">
        <h1>Login...!</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="input-group">
            <div className='input-field'>
              <TextField style={{ width: '100%' }} type="email" className="login-input" placeholder='Enter Email_id' value={email} onChange={(e) => setEmail(e.target.value)} required />
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
            <p><button type="button" className="btn_forget" onClick={handleForgotPassword} >Forgot Password</button></p>
            <div className='btn-field'>
              <button type="submit" className="btn-sub">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login