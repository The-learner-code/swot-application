import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, updateDoc } from "firebase/firestore";
import '../Styles/login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "vrms@gmail.com" && password === '123456') {
      navigate('/AdminDashboard');
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

      // Update the lastSignInTime in AuthDetails collection
      const authDetailsRef = doc(db, "AuthDetails", email);
      await updateDoc(authDetailsRef, {
        lastSignInTime: timestamp
      });

      toast.success("User logged in successfully");
      setTimeout(() => {
        if (email === "vrms@gmail.com") {
          navigate('/AdminDashboard');
        } else { 
          navigate('/Features'); 
        }
      }, 2000);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(`Login Unsuccessful. Error code: ${errorCode}, Error message: ${errorMessage}`);
      resetForm();
    }
  };
  return (
    <div className='Login-cotainer'>
      <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="BackToHome">
        <button onClick={() => navigate('/')} className="link-btn">Back to Home</button>
      </div>
      <div className="form-box">
        <h1>Login...!</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className='input-field'>
              <input type="email" className="login-input" placeholder='Enter Email_id' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='input-field'>
              <input type="password" className="login-input" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <p><button type="button" onClick={() => navigate('/PassReset')} className="btn_forget">Forgot Password</button></p>
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