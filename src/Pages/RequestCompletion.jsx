import React from 'react';
import '../Styles/requestconformation.css';
import Sidebar from '../Components/Sidebar/Admin_Sidebar';
import Navbar from '../Components/Header/Navbar';
import BookingRequest from '../Components/Table/BookingRequest';

const RequestCompletion = () => {
    return (
        <div className='Request'>
            <Sidebar />
            <div className="Requestcontainer">
                <Navbar />
                <div className="table">
                    <BookingRequest/>
                </div>
            </div>
        </div>
    )
}

export default RequestCompletion