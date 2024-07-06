import React from 'react';
import '../styles/report.css';
import Sidebar from '../component/sidebar/Admin_Sidebar';
import Navbar from '../component/header/Navbar';
import Charts from '../Reports/Charts';

const RequestCompletion = () => {
    return (
        <div className='Report'>
            <Sidebar />
            <div className="Reportcontainer">
                <Navbar />
                <div className="GraphContainer">
                    <Charts/>
                </div>
            </div>
        </div>
    )
}

export default RequestCompletion