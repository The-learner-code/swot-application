import { useState, useEffect } from 'react';
// Import necessary React hooks
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore";
// Import Firestore functions for data fetching and updating documents
import { db } from "../../firebase";
// Import the Firestore database configuration
import { DataGrid } from '@mui/x-data-grid';
// Import DataGrid component from MUI for displaying tabular data
import { CircularProgress, Button } from '@mui/material';
// Import CircularProgress and Button components from MUI
import './table.css';
// Import custom CSS for table styling

const BookingRequest = () => {
  // Define state variables for booking details and loading status
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch data from Firestore when the component mounts
  useEffect(() => {
    const fetchBookingRequest = async () => {
      // Create a query to fetch documents from the "BookingRequests" collection
      const q = collection(db, "BookingRequests");
      // Execute the query and get a snapshot of the documents
      const BookingSnapshot = await getDocs(q);
      // Map the documents to an array of booking details
      const BookingList = BookingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Update state with the fetched booking details and set loading to false
      setBooking(BookingList);
      setLoading(false);
    };

    // Call the fetchBookingRequest function
    fetchBookingRequest();
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Function to update the status of a booking
  const updateStatus = async (id, conform) => {
    // Reference the document in the "BookingRequests" collection with the specified ID
    const bookingRef = doc(db, "BookingRequests", id);
    // Update the status of the booking
    await updateDoc(bookingRef, { status: conform });

    // Update the booking state with the new status
    setBooking(booking.map(item => item.id === id ? { ...item, status: conform } : item));
  };

  // Function to update the status of a vehicle
  const updateVehicleStatus = async (vehicleNumber) => {
    // Create a query to find the vehicle with the specified vehicle number
    const vehicleQuery = query(collection(db, "VehicleDetails"), where("vehicleNumber", "==", vehicleNumber));
    // Execute the query and get a snapshot of the vehicle documents
    const vehicleSnapshot = await getDocs(vehicleQuery);

    // If a vehicle document is found, update its status to 'Available'
    if (!vehicleSnapshot.empty) {
      const vehicleDoc = vehicleSnapshot.docs[0];
      const vehicleRef = doc(db, "VehicleDetails", vehicleDoc.id);
      await updateDoc(vehicleRef, { status: 'Available' });
    }
  };

  // Function to handle confirming a booking
  const handleConfirm = async (id) => {
    await updateStatus(id, 'Confirmed - KYC Completed with User');
    setBooking(booking.map(item => item.id === id ? { ...item, status: 'Confirmed - KYC Completed with User' } : item));
  };

  // Function to handle declining a booking and updating vehicle status
  const handleDecline = async (id, vehicleNumber) => {
    await updateStatus(id, 'Declined - Discussed with User');
    await updateVehicleStatus(vehicleNumber);
    setBooking(booking.map(item => item.id === id ? { ...item, status: 'Declined - Discussed with User' } : item));
  };

  // Define the columns for the DataGrid
  const columns = [
    { field: 'timestamp', headerName: 'Timestamp', width: 180, headerClassName: 'table-header' },
    { field: 'userEmail', headerName: 'Email', width: 200, headerClassName: 'table-header' },
    { field: 'vehicleType', headerName: 'Vehicle Type', width: 120, headerClassName: 'table-header' },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 150, headerClassName: 'table-header' },
    { field: 'seatingSize', headerName: 'Seating Size', width: 130, headerClassName: 'table-header' },
    { field: 'startDate', headerName: 'From', width: 100, headerClassName: 'table-header' },
    { field: 'endDate', headerName: 'To', width: 100, headerClassName: 'table-header' },
    { field: 'status', headerName: 'Status', width: 300, headerClassName: 'table-header' },
    {
      field: 'action',
      headerName: 'Action',
      width: 300,
      headerClassName: 'table-header',
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleConfirm(params.row.id)}
            disabled={params.row.status === 'Confirmed - KYC Completed with User' || params.row.status === 'Declined - Discussed with User'}
            style={{ marginRight: '10px' }}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDecline(params.row.id, params.row.vehicleNumber)}
            disabled={params.row.status === 'Confirmed - KYC Completed with User' || params.row.status === 'Declined - Discussed with User'}
          >
            Decline
          </Button>
        </>
      ),
    },
  ];

  // Render the component
  return (
    <div className="table-container">
      {loading ? (
        // Show loading spinner if data is still being fetched
        <CircularProgress />
      ) : (
        <div style={{ height: 580, width: '100%' }}>
          <DataGrid
            rows={booking} // Data for the rows
            columns={columns} // Configuration for the columns
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20]} // Options for page size
          />
        </div>
      )}
    </div>
  );
}

export default BookingRequest; 
// Export the BookingRequest component as the default export
