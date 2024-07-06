import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { db } from "../../firebase";
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Link, Button } from '@mui/material'; // Import Button
import './table.css';

const ViewDetailstable = () => {
  const [vehicle, setVehicle] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const currentEmail = auth.currentUser?.email;
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchVehicles = async () => {
      if (currentEmail) {
        const q = query(collection(db, "VehicleDetails"), where("email", "==", currentEmail));
        const vehicleSnapshot = await getDocs(q);
        const vehicleList = vehicleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVehicle(vehicleList);
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [currentEmail]);

  const handleUpdateClick = (row) => {
    navigate('/AddVehiclePage', { state: { vehicle: row } });
  };

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
        <Link href={params.value} target="_blank" rel="noopener">
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
        <Link href={params.value} target="_blank" rel="noopener">
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
          onClick={() => handleUpdateClick(params.row)}
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <div className="table-container">
      {loading ? <CircularProgress /> : (
        <div style={{ height: 580, width: '100%' }}>
          <DataGrid
            rows={vehicle}
            columns={columns}
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

export default ViewDetailstable;
