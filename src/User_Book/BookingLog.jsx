// Import necessary dependencies and components
import React from 'react';
import '../styles/User_Book.css'; // Import custom CSS for styling
import Sidebar from '../component/sidebar/Book_Sidebar'; // Import Sidebar component
import Navbar from '../component/header/Navbar'; // Import Navbar component
import Table from '../component/tables/BookingTable'; // Import BookingTable component

// Functional component for displaying the booking log page
const BookingLog = () => {
    return (
        <div className='tableclass'> {/* Main container with custom class */}
            <Sidebar /> {/* Sidebar component */}
            <div className="tableclasscontainer"> {/* Container for the rest of the content */}
                <Navbar /> {/* Navbar component */}
                <div className="table"> {/* Container for the table */}
                    <Table /> {/* BookingTable component */}
                </div>
            </div>
        </div>
    )
}

// Export the component as default
export default BookingLog
