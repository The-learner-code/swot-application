// Import necessary dependencies and components
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Hooks for navigation and location
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebase authentication functions
import { doc, setDoc } from 'firebase/firestore'; // Firestore functions for setting documents
import { db } from '../firebase'; // Firestore database instance
import { toast, toastContainer } from '../toast'; // Toast notification functions and container
import '../styles/User_Book.css'; // Custom CSS for styling

// Functional component for displaying the booking details page
const BookingValidation = () => {
  const location = useLocation(); // Hook to get the current location
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [currentUser, setCurrentUser] = useState(null); // State to store the current user
  const { vehicle } = location.state || {}; // Get the vehicle from location state, fallback if state is null

  // useEffect hook to check authentication state on component mount
  useEffect(() => {
    const auth = getAuth(); // Get the current authentication instance
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); // Set the current user if authenticated
      } else {
        navigate('/LoginPage'); // Redirect to login if user is not authenticated
      }
    });
  }, [navigate]); // Dependency array to re-run the effect when navigate changes

  if (!vehicle) {
    navigate('/ViewVehicleBookingPage'); // Redirect to the previous page if vehicle is null
    return null;
  }

  // Function to check vehicle availability
  const checkAvailability = (startDate, endDate) => {
    const availableFrom = new Date(vehicle.availableFrom); // Convert availableFrom to Date object
    const availableTo = new Date(vehicle.availableTo); // Convert availableTo to Date object
    return startDate >= availableFrom && endDate <= availableTo; // Check if the dates are within the available range
  };

  // Function to format the timestamp
  const formatTimestamp = (date) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, timeZone: 'Asia/Kolkata' };
    return new Intl.DateTimeFormat('en-IN', options).format(date); // Format the date according to the options
  };

  // Function to handle booking submission
  const handleBooking = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const startDate = event.target.elements.startDate.value; // Get the start date from the form
    const endDate = event.target.elements.endDate.value; // Get the end date from the form
    const email = currentUser.email; // Get the current user's email
    const timestamp = formatTimestamp(new Date()); // Format the current date and time

    if (checkAvailability(new Date(startDate), new Date(endDate))) {
      try {
        const bookingRequestRef = doc(db, 'BookingRequests', vehicle.id); // Reference to the booking request document
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

        const vehicleRef = doc(db, 'VehicleDetails', vehicle.id); // Reference to the vehicle document
        await setDoc(vehicleRef, { status: 'Not_Available' }, { merge: true }); // Update the vehicle status to 'Not_Available'

        toast.success('Booking request submitted successfully!', {
          autoClose: 3000, // Auto close the toast after 3 seconds
        });
        setTimeout(() => {
          navigate('/ViewVehicleBookingPage'); // Redirect to the booking page
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

  // Function to handle cancel button click
  const handleCancel = () => {
    navigate('/ViewVehicleBookingPage'); // Navigate back to the booking page
  };

  return (
    <div className='booking-page'>
      {toastContainer} {/* Toast container for notifications */}
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
          <button type="submit">Book</button> {/* Submit button for booking */}
          <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button> {/* Cancel button */}
        </form>
      </div>
    </div>
  );
};

export default BookingValidation; // Export the component as default
