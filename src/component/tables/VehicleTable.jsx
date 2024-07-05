import { useState, useEffect } from 'react';
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Link, Button } from '@mui/material';
import './table.css';

const VehicleTable = () => {
  const [vehicledetail, setVehicledetail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      const q = query(collection(db, "VehicleDetails"));
      const UserSnapshot = await getDocs(q);
      const UserList = UserSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVehicledetail(UserList);
      setLoading(false);
    };

    fetchVehicle();
  }, []);

  const handleRemove = async (id) => {
    try {
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

  const columns = [
    { field: 'email', headerName: 'Email Id', width: 200, headerClassName: 'table-header' },
    { field: 'vehicleType', headerName: 'Vehicle Type', width: 150, headerClassName: 'table-header' },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 200, headerClassName: 'table-header' },
    { field: 'seatingSize', headerName: 'Seating Size', width: 150, headerClassName: 'table-header' },
    { field: 'availableFrom', headerName: 'Available From', width: 150, headerClassName: 'table-header' },
    { field: 'availableTo', headerName: 'Available To', width: 150, headerClassName: 'table-header' },
    { field: 'status', headerName: 'Status', width: 150, headerClassName: 'table-header' },
    {
      field: 'imageUrl',
      headerName: 'Car Photo',
      width: 130,
      headerClassName: 'table-header',
      renderCell: (params) => (
        <Link href={params.value} target="_blank" rel="noopener">
          View Photo
        </Link>
      ),
    },
    {
      field: 'pdfUrl',
      headerName: 'Car Document',
      headerClassName: 'table-header',
      width: 130,
      renderCell: (params) => (
        <Link href={params.value} target="_blank" rel="noopener">
          View Document
        </Link>
      ),
    },
    {
      field: 'remove',
      headerName: 'Remove',
      headerClassName: 'table-header',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleRemove(params.row.id)}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div className="table-container">
      {loading ? <CircularProgress /> : (
        <div style={{ height: 580, width: '100%' }}>
          <DataGrid
            rows={vehicledetail}
            columns={columns}
            initialState={{
              pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
              },
          }}
          pageSizeOptions={[5, 10, 20]}
          />
        </div>
      )}
    </div>
  );
}

export default VehicleTable;
