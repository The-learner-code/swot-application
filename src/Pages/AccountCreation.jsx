import { useState } from "react";
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/loginandregister.css';

const AccountCreation = () => {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [state, setState] = useState("");
    const [password, setPassword] = useState("");
    const [conpass, setConpass] = useState("");
    const navigate = useNavigate();

    const resetForm = () => {
        setEmail("");
        setFullName("");
        setAddress("");
        setPhoneNumber("");
        setState("");
        setPassword("");
        setConpass("");
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .endsWith('@gmail.com');
    };

    const validatePhoneNumber = (phoneNumber) => {
        return /^\d{10}$/.test(phoneNumber);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            toast.error("Password and Confirm Password do not match...!", { position: "bottom-left" });
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
            console.log(userCredential);
            const authDetailsRef = doc(db, "AuthDetails", email);
            const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            const userType = email === "vrmsrentalease@gmail.com" ? "Admin" : "Vehicle_User";

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

            toast.success(`${email} Profile Created successfully!`);
            setTimeout(() => {
                navigate('/Login');
            }, 3000); // Delay of 3 seconds
            resetForm();
        } catch (error) {
            toast.error(`Registration Unsuccessful. Error code: ${error.message}`);
            console.log(error);
            resetForm();
        }
    };

    return (
        <div className='Register-cotainer'>
            <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="Back">
                <button onClick={() => navigate('/')} className="link">Back to Home</button>
            </div>
            <div className="form-box">
                <h1>Enroll Your Detail...!</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <div className='input-field'>
                            <input type="text" placeholder='Enter Your Sweet Name' value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                        </div>
                        <div className='input-field'>
                            <input type="email" placeholder='Enter Your Email_id' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className='input-field'>
                            <input type="text" placeholder='Enter Your Address and District' value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </div>
                        <div className='input-field'>
                            <input type="text" placeholder='Enter Your State' value={state} onChange={(e) => setState(e.target.value)} required />
                        </div>
                        <div className='input-field'>
                            <input type="tel" placeholder='Enter Your Mobile Number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        </div>
                        <div className='input-field'>
                            <input type="password" placeholder='Enter Your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className='input-field'>
                            <input type="password" placeholder='Confirm Your password' value={conpass} onChange={(e) => setConpass(e.target.value)} required />
                        </div>
                        <div className='btn-field'>
                            <button type="submit" className="btn-sub">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>);
};

export default AccountCreation;
