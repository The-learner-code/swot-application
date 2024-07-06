import React, { useState, useEffect } from 'react'; 
// Import necessary React hooks
import { collection, getDocs, query } from "firebase/firestore"; 
// Import Firestore functions for data fetching
import { db } from "../../firebase"; 
// Import the Firestore database configuration
import { DataGrid } from '@mui/x-data-grid'; 
// Import DataGrid component from MUI for displaying tabular data
import { CircularProgress } from '@mui/material'; 
// Import CircularProgress component from MUI for loading spinner
import './table.css'; 
// Import custom CSS for table styling

const ListOfUserTable = () => {
  // Define state variables for user details and loading status
  const [userdetail, setUserdetail] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch data from Firestore when the component mounts
  useEffect(() => {
    const fetchUserTable = async () => {
      // Create a query to fetch documents from the "AuthDetails" collection
      const q = query(collection(db, "AuthDetails"));
      // Execute the query and get a snapshot of the documents
      const UserSnapshot = await getDocs(q);
      // Map the documents to an array of user details
      const UserList = UserSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Update state with the fetched user details and set loading to false
      setUserdetail(UserList);
      setLoading(false);
    };

    // Call the fetchUserTable function
    fetchUserTable();
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Define the columns for the DataGrid
  const columns = [
    { field: 'type', headerName: 'Type', width: 120, headerClassName: 'table-header' },
    { field: 'Name', headerName: 'Name', width: 128, headerClassName: 'table-header' },
    { field: 'Email_id', headerName: 'Email id', width: 200, headerClassName: 'table-header' },
    { field: 'createdAt', headerName: 'Created Date', width: 175, headerClassName: 'table-header' },
    { field: 'lastSignInTime', headerName: 'Last Signed In', width: 175, headerClassName: 'table-header' },
    {
      field: 'Address',
      headerName: 'Address',
      width: 250,
      headerClassName: 'table-header',
      renderCell: (params) => (
        <div style={{ 
          whiteSpace: 'pre-wrap', 
          wordBreak: 'break-word', 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: '1.2',  // Reduced line height
          padding: '4px 0'   // Adjust padding to fine-tune spacing
        }}>
          {params.value}
        </div>
      ),
    },
    { field: 'Phone_Number', headerName: 'Phone Number', width: 150, headerClassName: 'table-header' },
  ];

  // Render the component
  return (
    <div className="table-container">
      {loading ? <CircularProgress /> : (
        // Show loading spinner if data is still being fetched
        <div style={{ height: 580, width: '100%' }}>
          <DataGrid
            rows={userdetail} // Data for the rows
            columns={columns} // Configuration for the columns
            getRowId={(row) => row.id} // Ensure each row has a unique ID
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

export default ListOfUserTable; // Export the component as the default export
