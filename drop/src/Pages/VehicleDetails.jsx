import '../Styles/vehicledetail.css';
import Sidebar from '../Components/Sidebar/User_Sidebar';
import Navbar from '../Components/Header/Navbar';
import VehicleTable from '../Components/Table/ViewDetailtable';


const VehicleDetails = () => {
  return (
    <div className='VehicleDetails'>
      <Sidebar />
      <div className="VehicleDetailscontainer">
        <Navbar />
        <div className="table">
          <VehicleTable />
        </div>
      </div>
    </div>
  );
}

export default VehicleDetails;