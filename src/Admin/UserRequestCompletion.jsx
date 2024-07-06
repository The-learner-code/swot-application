import '../styles/Admin.css';
// Import custom CSS for admin styling
import Sidebar from '../component/sidebar/Admin_Sidebar';
// Import the Sidebar component
import Navbar from '../component/header/Navbar';
// Import the Navbar component
import Table from '../component/tables/UserRequestCompletionTable';
// Import the Table component that is User Request Completion Table
const UserRequestCompletion = () => {
    return (
        <div className='tableclass'>
            {/* Render the Sidebar component */}
            <Sidebar />
            <div className="tableclasscontainer">
                {/* Render the Navbar component */}
                <Navbar />
                <div className="table">
                    {/* Render the Table component */}
                    <Table/>
                </div>
            </div>
        </div>
    )
}

export default UserRequestCompletion