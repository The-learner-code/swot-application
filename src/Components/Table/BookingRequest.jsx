import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Button } from '@mui/material';
import './table.css';

const BookingRequest = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingRequest = async () => {
      const q = collection(db, "BookingRequests");
      const BookingSnapshot = await getDocs(q);
      const BookingList = BookingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooking(BookingList);
      setLoading(false);
    };

    fetchBookingRequest();
  }, []);

  const updateStatus = async (id, conform) => {
    const bookingRef = doc(db, "BookingRequests", id);
    await updateDoc(bookingRef, { status: conform });

    setBooking(booking.map(item => item.id === id ? { ...item, status: conform } : item));
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
    { field: 'timestamp', headerName: 'Timestamp', width: 180, headerClassName: 'table-header' },
    { field: 'userEmail', headerName: 'Email', width: 200, headerClassName: 'table-header' },
    { field: 'vehicleType', headerName: 'Vehicle Type', width: 120, headerClassName: 'table-header' },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 150, headerClassName: 'table-header' },
    { field: 'seatingSize', headerName: 'Seating Size', width: 130, headerClassName: 'table-header' },
    { field: 'startDate', headerName: 'From', width: 100, headerClassName: 'table-header' },
    { field: 'endDate', headerName: 'To', width: 100, headerClassName: 'table-header' },
    { field: 'status', headerName: 'Status', width: 100, headerClassName: 'table-header' },
    {
      field: 'confirm',
      headerName: 'Confirm',
      width: 150,
      headerClassName: 'table-header',
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
      headerClassName: 'table-header',
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

export default BookingRequest;
