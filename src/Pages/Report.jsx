import React from 'react';
// Import React library
import '../styles/Report.css';
// Import custom CSS for report styling
import Sidebar from '../component/sidebar/Admin_Sidebar';
// Import the Sidebar component
import Navbar from '../component/header/Navbar';
// Import the Navbar component
import Charts from '../Reports/Charts';
// Import the Charts component

const Report = () => {
    return (
        <div className='Report'>
            {/* Render the Sidebar component */}
            <Sidebar />
            <div className="Reportcontainer">
                {/* Render the Navbar component */}
                <Navbar />
                <div className="GraphContainer">
                    {/* Render the Charts component */}
                    <Charts />
                </div>
            </div>
        </div>
    )
}

export default Report; 
// Export the Report component as the default export
