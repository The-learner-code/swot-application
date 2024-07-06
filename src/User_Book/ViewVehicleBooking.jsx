// Import necessary dependencies and components
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Firestore functions for querying documents
import { db } from '../firebase'; // Firestore database instance
import '../styles/User_Book.css'; // Custom CSS for styling
import Sidebar from '../component/sidebar/Book_Sidebar'; // Sidebar component
import Navbar from '../component/header/Navbar'; // Navbar component
import { useNavigate } from 'react-router-dom'; // Hook for navigation

// Functional component for displaying available vehicle bookings
const ViewVehicleBooking = () => {
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [vehicles, setVehicles] = useState([]); // State to store fetched vehicles

  // useEffect hook to fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
        console.log('Current Date:', currentDate); // Log current date

        // Query to get available vehicles
        const q = query(
          collection(db, 'VehicleDetails'),
          where('status', '==', 'Available')
          // Uncomment the line below if you want to filter by availableTo date
          // where('availableTo', '>', currentDate)
        );

        const querySnapshot = await getDocs(q); // Execute the query
        console.log(querySnapshot); // Log the query snapshot
        const vehiclesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map query results to an array
        console.log('Fetched Vehicles Data:', vehiclesData); // Log fetched vehicle data
        setVehicles(vehiclesData); // Set the fetched vehicle data to state
      } catch (error) {
        console.error('Error fetching vehicle details:', error); // Log any errors
      }
    };

    fetchData(); // Call fetchData function
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to handle clicking on a vehicle
  const handleVehicleClick = (vehicle) => {
    navigate('/BookingValidationPage', { state: { vehicle } }); // Navigate to BookingValidationPage with vehicle data
  };

  return (
    <div className='ViewVehicle'>
      <Sidebar /> {/* Sidebar component */}
      <div className="ViewVehiclecontainer">
        <Navbar /> {/* Navbar component */}
        <div className='Block'>
          <div className='vehicle-grid'>
            {/* Map through the vehicles and display each vehicle */}
            {vehicles.map((vehicle, index) => (
              <div key={index} className='vehicle-block' onClick={() => handleVehicleClick(vehicle)}>
                <img className='vehicle-img' src={vehicle.imageUrl} alt="Vehicle" /> {/* Vehicle image */}
                <p className='vvbp'>Type: {vehicle.vehicleType}</p> {/* Vehicle type */}
                <p className='vvbp'>Model: {vehicle.vehicleModel}</p> {/* Vehicle model */}
                <p className='vvbp'>Seating Size: {vehicle.seatingSize}</p> {/* Seating size */}
                <p className='vvbp'>Available From: {new Date(vehicle.availableFrom).toLocaleDateString()}</p> {/* Available from date */}
                <p className='vvbp'>Available To: {new Date(vehicle.availableTo).toLocaleDateString()}</p> {/* Available to date */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the component as default
export default ViewVehicleBooking;
