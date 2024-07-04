import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import './table.css';

const StudentTable = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const currentEmail = auth.currentUser?.email;

  useEffect(() => {
    const fetchStudents = async () => {
      if (currentEmail) {
        const q = query(collection(db, "BookingRequests"), where("userEmail", "==", currentEmail));
        const BookingSnapshot = await getDocs(q);
        const BookingList = BookingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBooking(BookingList);
        setLoading(false);
      }
    };

    fetchStudents();
  }, [currentEmail]);

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
      {loading ? <CircularProgress /> : (
        <div style={{ height: 580, width: '100%' }}>
          <DataGrid
            rows={booking}
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
