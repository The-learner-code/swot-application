import '../Styles/listofuser.css';
import Sidebar from '../Components/Sidebar/Admin_Sidebar';
import Navbar from '../Components/Header/Navbar';
import UserTable from '../Components/Table/UserTable';

const ListOfUser = () => {
    return (
        <div className='ListOfUser'>
            <Sidebar />
            <div className="ListOfUsercontainer">
                <Navbar />
                <div className="table">
                    <UserTable/>
                </div>
            </div>
        </div>
    )
}

export default ListOfUser