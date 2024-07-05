import React from 'react';
import '../Styles/listofvehicle.css';
import Sidebar from '../Components/Sidebar/Admin_Sidebar';
import Navbar from '../Components/Header/Navbar';
import VehicleTable from '../Components/Table/VehicleTable';

const ListOfVehicle = () => {
    return (
        <div className='ListOfVehicle'>
            <Sidebar />
            <div className="ListOfVehiclecontainer">
                <Navbar />
                <div className="table">
                    <VehicleTable/>
                </div>
            </div>
        </div>
    )
}

export default ListOfVehicle