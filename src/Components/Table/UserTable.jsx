import { useState, useEffect } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import './table.css';

const StudentTable = () => {
    const [userdetail, setUserdetail] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchStudents = async () => {

            const q = query(collection(db, "AuthDetails"));
            const UserSnapshot = await getDocs(q);
            const UserList = UserSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUserdetail(UserList);
            setLoading(false);

        };

        fetchStudents();
    }, []);

    const columns = [
        { field: 'Name', headerName: 'Name', width: 150 },
        { field: 'Email_id', headerName: 'Email_id', width: 200 },
        { field: 'createdAt', headerName: 'Created Date', width: 200 },
        { field: 'lastSignInTime', headerName: 'Last Signed In', width: 200 },
        { field: 'Address', headerName: 'Address', width: 250 },
        { field: 'State', headerName: 'State', width: 150 },
        { field: 'Phone_Number', headerName: 'Phone_Number', width: 150 },
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
