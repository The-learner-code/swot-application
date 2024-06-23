import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Registerpage from './Pages/AccountCreation';
import Loginpage from './Pages/Login';
import Featurespage from './Pages/Features';
import UserProfilepage from './Pages/UserProfile';
import VehicleDetails from './Pages/VehicleDetails';
import ViewVehicle from './Pages/ViewVehicle';
import BookingDetailspage from './Pages/BookingDetails'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/Register' element={<Registerpage />} />
        <Route path='/Login' element={<Loginpage />} />
        <Route path='/Features' element={<Featurespage />} />
        <Route path='/UserProfile' element={<UserProfilepage/>} />
        <Route path='/VehicleDetails' element={<VehicleDetails/>}/>
        <Route path='/ViewVehicle' element={<ViewVehicle/>}/>
        <Route path='/BookingDetailspage' element={<BookingDetailspage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;