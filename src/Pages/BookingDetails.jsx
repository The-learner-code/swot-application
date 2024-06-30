import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/bookingdetails.css';

const BookingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const { vehicle } = location.state || {}; // Fallback if state is null

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        // Redirect to login if user is not authenticated
        navigate('/login');
      }
    });
  }, [navigate]);

  if (!vehicle) {
    // Redirect to the previous page or a default page
    navigate('/ViewVehicle');
    return null;
  }

  const checkAvailability = (startDate, endDate) => {
    const availableFrom = new Date(vehicle.availableFrom);
    const availableTo = new Date(vehicle.availableTo);
    return startDate >= availableFrom && endDate <= availableTo;
  };

  const formatTimestamp = (date) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, timeZone: 'Asia/Kolkata' };
    return new Intl.DateTimeFormat('en-IN', options).format(date);
  };

  const handleBooking = async (event) => {
    event.preventDefault();
    const startDate = event.target.elements.startDate.value;
    const endDate = event.target.elements.endDate.value;
    const email = currentUser.email;
    const timestamp = formatTimestamp(new Date());

    if (checkAvailability(new Date(startDate), new Date(endDate))) {
      try {
        const bookingRequestRef = doc(db, 'BookingRequests', vehicle.id);
        await setDoc(bookingRequestRef, {
          vehicleNumber: vehicle.id,
          vehicleType: vehicle.vehicleType,
          vehicleModel: vehicle.vehicleModel,
          seatingSize: vehicle.seatingSize,
          startDate,
          endDate,
          userEmail: email,
          status: 'Booked - Waiting Confirmation',
          timestamp: timestamp.toString(), // Adding the timestamp
        });

        const vehicleRef = doc(db, 'VehicleDetails', vehicle.id);
        await setDoc(vehicleRef, { status: 'Not_Available' }, { merge: true });

        toast.success('Booking request submitted successfully!', {
          autoClose: 3000, // Auto close the toast after 3 seconds
        });
        setTimeout(() => {
          navigate('/ViewVehicle'); // Redirect to home or another page
      }, 3000); // Delay of 3 seconds

        
      } catch (error) {
        console.error('Error adding booking request:', error);

        toast.error('Failed to submit booking request.', {
          autoClose: 3000, // Auto close the toast after 3 seconds
        });
      }
    } else {
      toast.error('The vehicle is not available for the selected dates.', {
        autoClose: 3000, // Auto close the toast after 3 seconds
      });
    }
  };

  const handleCancel = () => {
    navigate('/ViewVehicle');
  };

  return (
    <div className='booking-page'>
      <div className="booking-container">
        <h1>Booking Details for {vehicle.vehicleType}</h1>
        <form onSubmit={handleBooking}>
          <label>
            Start Date:
            <input type="date" name="startDate" required />
          </label>
          <br />
          <label>
            End Date:
            <input type="date" name="endDate" required />
          </label>
          <br />
          <button type="submit">Book</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookingDetails;
