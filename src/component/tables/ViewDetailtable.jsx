// Import necessary hooks and Firebase functions
import { useState, useEffect } from 'react'; // React hooks for state and lifecycle management
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore functions for querying the database
import { getAuth } from "firebase/auth"; // Firebase Authentication service
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import { db } from "../../firebase"; // Firestore database instance
import { DataGrid } from '@mui/x-data-grid'; // DataGrid component from Material-UI for displaying data in a table
import { CircularProgress, Link, Button } from '@mui/material'; // Material-UI components for loading spinner, links, and buttons
import './table.css'; // Custom CSS for styling the table

// Functional component for displaying the vehicle details table
const ViewDetailstable = () => {
  // State variables for vehicles and loading status
  const [vehicle, setVehicle] = useState([]); // State to store the list of vehicles
  const [loading, setLoading] = useState(true); // State to manage loading spinner
  const auth = getAuth(); // Get the current authentication instance
  const currentEmail = auth.currentUser?.email; // Get the current user's email
  const navigate = useNavigate(); // Initialize navigation hook

  // useEffect hook to fetch vehicle data when the component mounts or when currentEmail changes
  useEffect(() => {
    const fetchVehicles = async () => {
      if (currentEmail) {
        // Create a query to get vehicles for the current user
        const q = query(collection(db, "VehicleDetails"), where("email", "==", currentEmail));
        // Execute the query and get the snapshot of the results
        const vehicleSnapshot = await getDocs(q);
        // Map over the snapshot to get an array of vehicle objects with their IDs
        const vehicleList = vehicleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Update the state with the fetched vehicles
        setVehicle(vehicleList);
        // Set loading to false as data fetching is complete
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [currentEmail]); // Dependency array to re-run the effect when currentEmail changes

  // Function to handle the update button click
  const handleUpdateClick = (row) => {
    navigate('/AddVehiclePage', { state: { vehicle: row } }); // Navigate to the AddVehiclePage with the selected vehicle data
  };

  // Define columns for the DataGrid
  const columns = [
    { field: 'vehicleType', headerName: 'Vehicle Type', width: 150, headerClassName: 'table-header' },
    { field: 'vehicleModel', headerName: 'Vehicle Model', width: 200, headerClassName: 'table-header' },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 200, headerClassName: 'table-header' },
    { field: 'seatingSize', headerName: 'Seating Size', width: 150, headerClassName: 'table-header' },
    { field: 'availableFrom', headerName: 'Available From', width: 150, headerClassName: 'table-header' },
    { field: 'availableTo', headerName: 'Available To', width: 150, headerClassName: 'table-header' },
    { field: 'status', headerName: 'Status', width: 200, headerClassName: 'table-header' },
    {
      field: 'imageUrl',
      headerName: 'Car Photo',
      width: 150,
      headerClassName: 'table-header',
      renderCell: (params) => (
        <Link href={params.value} target="_blank" rel="noopener"> {/* Link to open the car photo in a new tab*/}
          View Photo
        </Link>
      ),
    },
    {
      field: 'pdfUrl',
      headerName: 'Car Document',
      width: 150,
      headerClassName: 'table-header',
      renderCell: (params) => (
        <Link href={params.value} target="_blank" rel="noopener"> {/* Link to open the car document in a new tab */}
          View Document
        </Link>
      ),
    },
    {
      field: 'update',
      headerName: 'Update',
      width: 150,
      headerClassName: 'table-header',
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpdateClick(params.row)} // Button to update the vehicle details
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <div className="table-container">
      {loading ? <CircularProgress /> : ( // Show loading spinner while data is being fetched
        <div style={{ height: 580, width: '100%' }}>
          <DataGrid
            rows={vehicle} // Pass the vehicle data to the DataGrid
            columns={columns} // Pass the column definitions to the DataGrid
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 }, // Initial pagination settings
              },
            }}
            pageSizeOptions={[5, 10, 20]} // Options for page size
          />
        </div>
      )}
    </div>
  );
}

// Export the component as default
export default ViewDetailstable;
