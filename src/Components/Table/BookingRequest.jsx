import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Button } from '@mui/material';
import './table.css';

const StudentTable = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchStudents = async () => {
      const q = collection(db, "BookingRequests");
      const BookingSnapshot = await getDocs(q);
      const BookingList = BookingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooking(BookingList);
      setLoading(false);
    };

    fetchStudents();
  }, []);

  const updateStatus = async (id, status) => {
    const bookingRef = doc(db, "BookingRequests", id);
    await updateDoc(bookingRef, { status: status });

    setBooking(booking.map(item => item.id === id ? { ...item, status: status } : item));
  };

  const updateVehicleStatus = async (vehicleNumber) => {
    const vehicleQuery = query(collection(db, "VehicleDetails"), where("vehicleNumber", "==", vehicleNumber));
    const vehicleSnapshot = await getDocs(vehicleQuery);

    if (!vehicleSnapshot.empty) {
      const vehicleDoc = vehicleSnapshot.docs[0];
      const vehicleRef = doc(db, "VehicleDetails", vehicleDoc.id);
      await updateDoc(vehicleRef, { status: 'Available' });
    }
  };

  const handleConfirm = async (id) => {
    await updateStatus(id, 'Confirmed');
    setBooking(booking.map(item => item.id === id ? { ...item, status: 'Confirmed' } : item));
  };

  const handleDecline = async (id, vehicleNumber) => {
    await updateStatus(id, 'Declined');
    await updateVehicleStatus(vehicleNumber);
    setBooking(booking.map(item => item.id === id ? { ...item, status: 'Declined' } : item));
  };

  const columns = [
    { field: 'timestamp', headerName: 'timestamp', width: 250 },
    { field: 'userEmail', headerName: 'userEmail', width: 200 },
    { field: 'vehicleType', headerName: 'Vehicle Type', width: 100 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 120 },
    { field: 'seatingSize', headerName: 'Seating Size', width: 100 },
    { field: 'startDate', headerName: 'From', width: 100 },
    { field: 'endDate', headerName: 'To', width: 100 },
    { field: 'status', headerName: 'Status', width: 250 },
    {
      field: 'confirm',
      headerName: 'Confirm',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => handleConfirm(params.row.id)}
          disabled={params.row.status === 'Confirmed' || params.row.status === 'Declined'}
        >
          Confirm
        </Button>
      ),
    },
    {
      field: 'decline',
      headerName: 'Decline',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDecline(params.row.id, params.row.vehicleNumber)}
          disabled={params.row.status === 'Confirmed' || params.row.status === 'Declined'}
        >
          Decline
        </Button>
      ),
    },
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
