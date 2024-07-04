import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import ContactUs from './Pages/ContactUs';
import Registerpage from './Pages/AccountCreation';
import Loginpage from './Pages/Login';
import Featurespage from './Pages/Features';
import UpdateVehicle from './Pages/UpdateVehicle';
import VehicleDetails from './Pages/VehicleDetails';
import ViewVehicle from './Pages/ViewVehicle';
import BookingDetailspage from './Pages/BookingDetails'
import ViewBooking from './Pages/ViewBooking';
import ListOfUser from './Pages/ListOfUser';
import ListOfVehicle from './Pages/ListOfVehicle';
import RequestCompletion from './Pages/RequestCompletion';
import Charts from './Reports/Charts';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/Contact_Us' element={<ContactUs />} />
        <Route path='/Register' element={<Registerpage />} />
        <Route path='/Login' element={<Loginpage />} />
        <Route path='/Features' element={<Featurespage />} />
        <Route path='/UpdateVehicle' element={<UpdateVehicle/>} />
        <Route path='/VehicleDetails' element={<VehicleDetails/>}/>
        <Route path='/ViewVehicle' element={<ViewVehicle/>}/>
        <Route path='/BookingDetailspage' element={<BookingDetailspage />} />
        <Route path='/ViewBooking' element={<ViewBooking />} />
        <Route path='/ListOfUser' element={<ListOfUser />} />
        <Route path='/ListOfVehicle' element={<ListOfVehicle />} />
        <Route path='/RequestCompletion' element={<RequestCompletion />} />
        <Route path='/Charts' element={<Charts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;