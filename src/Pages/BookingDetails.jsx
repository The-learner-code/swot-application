import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

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
    const startDate = new Date(event.target.elements.startDate.value);
    const endDate = new Date(event.target.elements.endDate.value);
const email = currentUser.email;

    if (checkAvailability(startDate, endDate)) {
      try {
        const bookingRequestRef = doc(db, 'BookingRequests', email);
        await setDoc(bookingRequestRef, {
          vehicleNumber: vehicle.id,
          vehicleType: vehicle.vehicleType,
          seatingSize: vehicle.seatingSize,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          userEmail: email,
          status: 'Pending',
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

  return (
    <div>
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
        <button type="submit">Check Availability</button>
      </form>
    </div>
  );
};

export default BookingDetails;
