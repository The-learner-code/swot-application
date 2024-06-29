import { useState, useEffect } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import './table.css';


const UserTable = () => {

    const [userdetail, setUserdetail] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUserTable = async () => {

            const q = query(collection(db, "AuthDetails"));
            const UserSnapshot = await getDocs(q);
            const UserList = UserSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUserdetail(UserList);
            setLoading(false);

        };

        fetchUserTable();
    }, []);

    const columns = [
        { field: 'Name', headerName: 'Name', width: 150, headerClassName: 'table-header' },
        { field: 'Email_id', headerName: 'Email_id', width: 200, headerClassName: 'table-header' },
        { field: 'createdAt', headerName: 'Created Date', width: 200, headerClassName: 'table-header' },
        { field: 'lastSignInTime', headerName: 'Last Signed In', width: 200, headerClassName: 'table-header' },
        { field: 'Address', headerName: 'Address', width: 250, headerClassName: 'table-header' },
        { field: 'State', headerName: 'State', width: 150, headerClassName: 'table-header' },
        { field: 'Phone_Number', headerName: 'Phone_Number', width: 150, headerClassName: 'table-header' },
    ];

    return (
        <div className="table-container">
            {loading ? <CircularProgress /> : (
                <div style={{ height: 580, width: '100%' }}>
                    <DataGrid
                        rows={userdetail}
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

export default UserTable;
