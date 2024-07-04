import React from 'react';
import '../Styles/report.css';
import Sidebar from '../Components/Sidebar/Admin_Sidebar';
import Navbar from '../Components/Header/Navbar';
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