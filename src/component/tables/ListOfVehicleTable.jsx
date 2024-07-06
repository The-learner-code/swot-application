import { useState, useEffect } from 'react';
// Import necessary React hooks
import { collection, getDocs, query, deleteDoc, doc, updateDoc } from "firebase/firestore";
// Import Firestore functions for data fetching and document deletion
import { db } from "../../firebase";
// Import the Firestore database configuration
import { DataGrid } from '@mui/x-data-grid';
// Import DataGrid component from MUI for displaying tabular data
import { CircularProgress, Link, Button } from '@mui/material';
// Import CircularProgress, Link, and Button components from MUI
import './table.css';
// Import custom CSS for table styling

const ListOfVehicleTable = () => {
  // Define state variables for vehicle details and loading status
  const [vehicledetail, setVehicledetail] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch data from Firestore when the component mounts
  useEffect(() => {
    const fetchVehicle = async () => {
      // Create a query to fetch documents from the "VehicleDetails" collection
      const q = query(collection(db, "VehicleDetails"));
      // Execute the query and get a snapshot of the documents
      const UserSnapshot = await getDocs(q);
      // Map the documents to an array of vehicle details
      const UserList = UserSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Update state with the fetched vehicle details and set loading to false
      setVehicledetail(UserList);
      setLoading(false);
    };

    // Call the fetchVehicle function
    fetchVehicle();
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Function to handle the removal of a document
  const handleRemove = async (id) => {
    try {
      // Delete the document with the specified ID
      await deleteDoc(doc(db, "VehicleDetails", id));
      // Refresh data after deletion
      const q = query(collection(db, "VehicleDetails"));
      const UserSnapshot = await getDocs(q);
      const UserList = UserSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVehicledetail(UserList);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  // Function to handle the verification of a document(vehicle)
  const handleVerify = async (id) => {
    try {
      const vehicleDocRef = doc(db, "VehicleDetails", id);
      await updateDoc(vehicleDocRef, { status: 'Available' });
      const q = query(collection(db, "VehicleDetails"));
      const UserSnapshot = await getDocs(q);
      const UserList = UserSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVehicledetail(UserList);
    } catch (error) {
      console.error("Error verifying document: ", error);
    }
  };

  // Define the columns for the DataGrid
  const columns = [
    { field: 'email', headerName: 'Email Id', width: 180, headerClassName: 'table-header' },
    { field: 'vehicleType', headerName: 'Vehicle Type', width: 120, headerClassName: 'table-header' },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 150, headerClassName: 'table-header' },
    { field: 'seatingSize', headerName: 'Seating Size', width: 120, headerClassName: 'table-header' },
    { field: 'availableFrom', headerName: 'Available From', width: 140, headerClassName: 'table-header' },
    { field: 'availableTo', headerName: 'Available To', width: 110, headerClassName: 'table-header' },
    { field: 'status', headerName: 'Status', width: 80, headerClassName: 'table-header' },
    {
      field: 'imageUrl',
      headerName: 'Photo',
      width: 100,
      headerClassName: 'table-header',
      renderCell: (params) => (
        <Link href={params.value} target="_blank" rel="noopener">
          View Photo
        </Link>
      ),
    },
    {
      field: 'pdfUrl',
      headerName: 'Document',
      headerClassName: 'table-header',
      width: 130,
      renderCell: (params) => (
        <Link href={params.value} target="_blank" rel="noopener">
          View Document
        </Link>
      ),
    },
    {
      field: 'actions',
      headerName: 'Action',
      headerClassName: 'table-header',
      width: 300,  // Adjust the width as needed
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="success"
            style={{
              marginRight: '8px',
            }}
            onClick={() => handleVerify(params.row.id)}
            disabled={params.row.status === 'Available'}
          >
            Verify
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: 'red', color: 'white' }}
            onClick={() => handleRemove(params.row.id)}
          >
            Remove
          </Button>
        </div>
      ),
    }
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
            rows={vehicledetail} // Data for the rows
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

export default ListOfVehicleTable; // Export the component as the default export
