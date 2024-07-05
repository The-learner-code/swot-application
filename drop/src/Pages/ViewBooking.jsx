import React from 'react';
import '../Styles/viewbooking.css';
import Sidebar from '../Components/Sidebar/Book_Sidebar';
import Navbar from '../Components/Header/Navbar';
import VehicleTable from '../Components/Table/BookingTable';

const ViewBooking = () => {
    return (
        <div className='ViewBooking'>
            <Sidebar />
            <div className="ViewBookingcontainer">
                <Navbar />
                <div className="table">
                    <VehicleTable />
                </div>
            </div>
        </div>
    )
}

export default ViewBooking