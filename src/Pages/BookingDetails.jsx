import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
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

  const handleBooking = async (event) => {
    event.preventDefault();
    const startDate = event.target.elements.startDate.value;
    const endDate = event.target.elements.endDate.value;
    const email = currentUser.email;

    if (checkAvailability(new Date(startDate), new Date(endDate))) {
      try {
        const bookingRequestRef = doc(db, 'BookingRequests', email);
        await setDoc(bookingRequestRef, {
          vehicleNumber: vehicle.id,
          vehicleType: vehicle.vehicleType,
          seatingSize: vehicle.seatingSize,
          startDate,
          endDate,
          userEmail: email,
          status: 'Booked',
        });

        const vehicleRef = doc(db, 'VehicleDetails', vehicle.id);
        await setDoc(vehicleRef, { status: 'Not_Available' }, { merge: true });

        alert('Booking request submitted successfully!');
        navigate('/ViewVehicle'); // Redirect to home or another page
      } catch (error) {
        console.error('Error adding booking request:', error);
        alert('Failed to submit booking request.');
      }
    } else {
      alert('The vehicle is not available for the selected dates.');
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
    </div>
  );
};

export default BookingDetails;
