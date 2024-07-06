// Import necessary dependencies and components
import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase'; // Firebase authentication, Firestore database, and storage
import { doc, setDoc, updateDoc } from 'firebase/firestore'; // Firestore functions for document operations
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase storage functions for file operations
import '../styles/User_Vehicle.css'; // Custom CSS for styling
import Sidebar from '../component/sidebar/Owner_Sidebar'; // Sidebar component
import Navbar from '../component/header/Navbar'; // Navbar component
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'; // Upload icon
import { toast, toastContainer } from '../toast'; // Toast notification library
import { useNavigate, useLocation } from 'react-router-dom'; // Hooks for navigation and location

// Functional component for adding or updating vehicle details
const AddVehicle = () => {
  // State variables for vehicle details and files
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
  const location = useLocation();
  const vehicleData = location.state?.vehicle; // Get vehicle data from location state

  // Fetch current user details on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // If vehicle data is available, pre-fill the form fields
  useEffect(() => {
    if (vehicleData) {
      setVehicleModel(vehicleData.vehicleModel);
      setVehicleType(vehicleData.vehicleType);
      setVehicleNumber(vehicleData.vehicleNumber);
      setSeatingSize(vehicleData.seatingSize);
      setAvailableFrom(vehicleData.availableFrom);
      setAvailableTo(vehicleData.availableTo);
    }
  }, [vehicleData]);

  // Function to handle image file upload
  const handleImageUpload = async () => {
    if (!imageFile) return vehicleData?.imageUrl || null; // Return existing image URL if no new image is selected
    const storageRef = ref(storage, `user_car_photo/${currentUser.uid}/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  // Function to handle document file upload
  const handleDocUpload = async () => {
    if (!pdfFile) return vehicleData?.pdfUrl || null; // Return existing document URL if no new document is selected
    const storageRef = ref(storage, `user_documents/${currentUser.uid}/${pdfFile.name}`);
    await uploadBytes(storageRef, pdfFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  // Function to handle form submission
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
        status: 'Waiting for Admin Approval',
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

      // Update user type in AuthDetails
      await updateDoc(doc(db, 'AuthDetails', email), {
        type: "Vehicle_Owner",
      });

      toast.success('Details updated successfully!');

      // Delay before navigating to VehicleDetails page
      setTimeout(() => {
        navigate('/ViewVehiclePage');
      }, 3000); // Adjust the delay as needed

    } catch (error) {
      console.error('Error updating details: ', error);
      toast.error('Error updating details. Please try again later.');
    }
  };

  return (
    <div className='UserProfile'>
      {toastContainer}
      <Sidebar /> {/* Sidebar component */}
      <div className="UserProfilecontainer">
        <Navbar /> {/* Navbar component */}
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
              <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} required disabled={!!vehicleData} />
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
            <button type="submit">{vehicleData ? 'Update' : 'Add'} Vehicle</button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Export the component as default
export default AddVehicle;
