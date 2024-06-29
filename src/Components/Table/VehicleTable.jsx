import { useState, useEffect } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Link } from '@mui/material';
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

  const columns = [
    { field: 'email', headerName: 'email', width: 150, headerClassName: 'table-header' },
    { field: 'vehicleType', headerName: 'vehicle Type', width: 150, headerClassName: 'table-header' },
    { field: 'vehicleNumber', headerName: 'vehicle Number', width: 200, headerClassName: 'table-header' },
    { field: 'seatingSize', headerName: 'seating Size', width: 200, headerClassName: 'table-header' },
    { field: 'availableFrom', headerName: 'availableFrom', width: 200, headerClassName: 'table-header' },
    { field: 'availableTo', headerName: 'availableTo', width: 250, headerClassName: 'table-header' },
    { field: 'status', headerName: 'status', width: 150, headerClassName: 'table-header' },
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
      headerClassName: 'table-header',
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
