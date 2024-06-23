import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Link } from '@mui/material';
import './table.css';

const StudentTable = () => {
  const [vehicle, setVehicle] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const currentEmail = auth.currentUser?.email;

  useEffect(() => {
    const fetchStudents = async () => {
      if (currentEmail) {
        const q = query(collection(db, "VehicleDetails"), where("email", "==", currentEmail));
        const VehicleSnapshot = await getDocs(q);
        const VehicleList = VehicleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVehicle(VehicleList);
        setLoading(false);
      }
    };

    fetchStudents();
  }, [currentEmail]);

  const columns = [
    { field: 'vehicleType', headerName: 'Vehicle Type', width: 150 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 200 },
    { field: 'seatingSize', headerName: 'Seating Size', width: 150 },
    { field: 'availableFrom', headerName: 'Available From', width: 150 },
    { field: 'availableTo', headerName: 'Available To', width: 150 },
    {
      field: 'imageUrl',
      headerName: 'Car Photo',
      width: 150,
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
      renderCell: (params) => (
        <Link href={params.value} target="_blank" rel="noopener">
          View Document
        </Link>
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
            pageSize={10}
            rowsPerPageOptions={[10, 20, 30]}
          />
        </div>
      )}
    </div>
  );
}

export default StudentTable;
