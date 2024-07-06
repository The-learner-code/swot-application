// Import necessary CSS and components
import '../styles/User_Vehicle.css'; // Custom CSS for styling
import Sidebar from '../component/sidebar/Owner_Sidebar'; // Sidebar component
import Navbar from '../component/header/Navbar'; // Navbar component
import Table from '../component/tables/ViewDetailtable'; // Table component

// Functional component for viewing vehicle details
const ViewVehicle = () => {
  return (
    <div className='tableclass'>
      <Sidebar /> {/* Sidebar component */}
      <div className="tableclasscontainer">
        <Navbar /> {/* Navbar component */}
        <div className="table">
          <Table /> {/* Table component to display vehicle details */}
        </div>
      </div>
    </div>
  );
}
// Export the component as default
export default ViewVehicle;






