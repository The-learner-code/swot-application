// Import necessary hooks and Firebase functions
import { useState, useEffect } from 'react'; // React hooks for state and lifecycle management
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore functions for querying the database
import { getAuth } from "firebase/auth"; // Firebase Authentication service
import { db } from "../../firebase"; // Firestore database instance
import { DataGrid } from '@mui/x-data-grid'; // DataGrid component from Material-UI for displaying data in a table
import { CircularProgress } from '@mui/material'; // CircularProgress component from Material-UI for showing a loading spinner
import './table.css'; // Custom CSS for styling the table

// Functional component for displaying the booking log table
const BookingLogTable = () => {
  // State variables for bookings and loading status
  const [booking, setBooking] = useState([]); // State to store the list of bookings
  const [loading, setLoading] = useState(true); // State to manage loading spinner
  const auth = getAuth(); // Get the current authentication instance
  const currentEmail = auth.currentUser?.email; // Get the current user's email

  // useEffect hook to fetch booking data when the component mounts or when currentEmail changes
  useEffect(() => {
    const fetchBooking = async () => {
      if (currentEmail) {
        // Create a query to get bookings for the current user
        const q = query(collection(db, "BookingRequests"), where("userEmail", "==", currentEmail));
        // Execute the query and get the snapshot of the results
        const BookingSnapshot = await getDocs(q);
        // Map over the snapshot to get an array of booking objects with their IDs
        const BookingList = BookingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Update the state with the fetched bookings
        setBooking(BookingList);
        // Set loading to false as data fetching is complete
        setLoading(false);
      }
    };

    fetchBooking();
  }, [currentEmail]); // Dependency array to re-run the effect when currentEmail changes

  // Define columns for the DataGrid
  const columns = [
    { field: 'timestamp', headerName: 'Timestamp', width: 200 },
    { field: 'vehicleType', headerName: 'Vehicle Type', width: 150 },
    { field: 'vehicleModel', headerName: 'Vehicle Model', width: 150 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 200 },
    { field: 'seatingSize', headerName: 'Seating Size', width: 150 },
    { field: 'startDate', headerName: 'From', width: 150 },
    { field: 'endDate', headerName: 'To', width: 150 },
    { field: 'status', headerName: 'Status', width: 250},
  ];

  return (
    <div className="table-container">
      {loading ? <CircularProgress /> : ( // Show loading spinner while data is being fetched
        <div style={{ height: 580, width: '100%' }}>
          <DataGrid
            rows={booking} // Pass the booking data to the DataGrid
            columns={columns} // Pass the column definitions to the DataGrid
            pageSize={10} // Set the number of rows per page
            rowsPerPageOptions={[10, 20, 30]} // Set options for rows per page
          />
        </div>
      )}
    </div>
  );
}

// Export the component as default
export default BookingLogTable;
