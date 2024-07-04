import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../Styles/updatevehicle.css';
import Sidebar from '../Components/Sidebar/User_Sidebar';
import Navbar from '../Components/Header/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { toast, toastContainer } from '../toast';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [seatingSize, setSeatingSize] = useState('');
  const [availableFrom, setAvailableFrom] = useState('');
  const [availableTo, setAvailableTo] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleImageUpload = async () => {
    if (!imageFile) return null;
    const storageRef = ref(storage, `user_photos/${currentUser.uid}/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleDocUpload = async () => {
    if (!pdfFile) return null;
    const storageRef = ref(storage, `user_resumes/${currentUser.uid}/${pdfFile.name}`);
    await uploadBytes(storageRef, pdfFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!currentUser) {
      toast.error('User not logged in.');
      return;
    }

    const { email } = currentUser;

    try {
      // Upload image and document to Storage concurrently
      const [imageUrl, pdfUrl] = await Promise.all([
        handleImageUpload(),
        handleDocUpload()
      ]);

      if (!imageUrl) {
        toast.error("Photo is empty, Please add Photo");
        return;
      }
      if (!pdfUrl) {
        toast.error("Document is empty, Please add Document");
        return;
      }

      // Save form data and URLs to Firestore
      await setDoc(doc(db, 'VehicleDetails', vehicleNumber), {
        email,
        vehicleType,
        vehicleModel,
        vehicleNumber,
        seatingSize,
        availableFrom,
        availableTo,
        imageUrl,
        pdfUrl,
        status: 'Available',
      }, { merge: true });

      // Clear form after submission
      setVehicleType('');
      setVehicleModel('');
      setVehicleNumber('');
      setSeatingSize('');
      setAvailableFrom('');
      setAvailableTo('');
      setImageFile(null);
      setPdfFile(null);

      await updateDoc(doc(db, 'AuthDetails', email), {
        type: "Vehicle_Owner",
      });



      toast.success('Details updated successfully!');

      // Delay before navigating to VehicleDetails page
      setTimeout(() => {
        navigate('/VehicleDetails');
      }, 3000); // Adjust the delay as needed

    } catch (error) {
      console.error('Error updating details: ', error);
      toast.error('Error updating details. Please try again later.');
    }
  };

  return (
    <div className='UserProfile'>
      {toastContainer}
      <Sidebar />
      <div className="UserProfilecontainer">
        <Navbar />
        <div className="form-container">
          <form autoComplete='off' onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Vehicle Type</label>
              <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required>
                <option value="">Type</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
              </select>
            </div>
            <div className="form-group">
              <label>Vehicle Model</label>
              <input type="text" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Vehicle Number</label>
              <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Seating Size</label>
              <input type="number" value={seatingSize} onChange={(e) => setSeatingSize(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Available From</label>
              <input type="date" value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Available To</label>
              <input type="date" value={availableTo} onChange={(e) => setAvailableTo(e.target.value)} required />
            </div>
            <div className="form-file">
              <label htmlFor="file">Upload Image <DriveFolderUploadOutlinedIcon className="icon" /></label>
              <input type="file" onChange={(e) => setImageFile(e.target.files[0])} accept="image/*" style={{ display: "none" }} id="file" />
            </div>
            <div className="form-file">
              <label htmlFor="documents">Upload Documents <DriveFolderUploadOutlinedIcon className="icon" /></label>
              <input type="file" onChange={(e) => setPdfFile(e.target.files[0])} accept=".pdf" style={{ display: "none" }} id="documents" />
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;