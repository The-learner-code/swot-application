import { useState, useEffect } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Link } from '@mui/material';
import './table.css';

const StudentTable = () => {
    const [userdetail, setUserdetail] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchStudents = async () => {

            const q = query(collection(db, "VehicleDetails"));
            const UserSnapshot = await getDocs(q);
            const UserList = UserSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUserdetail(UserList);
            setLoading(false);

        };

        fetchStudents();
    }, []);

    const columns = [
        { field: 'email', headerName: 'email', width: 150 },
        { field: 'vehicleType', headerName: 'vehicle Type', width: 150 },
        { field: 'vehicleNumber', headerName: 'vehicle Number', width: 200 },
        { field: 'seatingSize', headerName: 'seating Size', width: 200 },
        { field: 'availableFrom', headerName: 'availableFrom', width: 200 },
        { field: 'availableTo', headerName: 'availableTo', width: 250 },
        { field: 'status', headerName: 'status', width: 150 },
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
                        rows={userdetail}
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
