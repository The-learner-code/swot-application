import '../styles/User_Vehicle.css';
import Sidebar from '../component/sidebar/Owner_Sidebar';
import Navbar from '../component/header/Navbar';
import Table from '../component/tables/ViewDetailtable';


const ViewVehicle = () => {
  return (
    <div className='tableclass'>
      <Sidebar />
      <div className="tableclasscontainer">
        <Navbar />
        <div className="table">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default ViewVehicle;