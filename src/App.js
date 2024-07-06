import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Homepage'; // Import Landing Page component
import ContactPage from './pages/Contact'; // Import Contact Page component
import LoginPage from './pages/Login'; // Import Login Page component
import RegisterPage from './pages/Register'; // Import Register Page component
import FeaturesPage from './pages/Features'; // Import Features Page component
import ReportPage from './pages/Report'; // Import Report Page component
import ListOfUserPage from './Admin/ListOfUser'; // Import List of User Page component (Admin)
import ListOfVehiclePage from './Admin/ListOfVehicle'; // Import List of Vehicle Page component (Admin)
import UserRequestCompletionPage from './Admin/UserRequestCompletion'; // Import User Request Completion Page component (Admin)
import AddVehiclePage from './User_Vehicle/AddVehicle'; // Import Add Vehicle Page component (User Vehicle Owner)
import ViewVehiclePage from './User_Vehicle/ViewVehicle'; // Import View Vehicle Page component (User Vehicle Owner)
import BookingLogPage from './User_Book/BookingLog'; // Import Booking Log Page component (User Booking)
import ViewVehicleBookingPage from './User_Book/ViewVehicleBooking'; // Import View Vehicle Booking Page component (User Booking)
import BookingValidationPage from './User_Book/BookingValidation'; // Import Booking Validation Page component (User Booking)

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<LandingPage />} /> {/* Landing Page Route */}
        <Route path='/ContactPage' element={<ContactPage />} /> {/* Contact Page Route */}
        <Route path='/LoginPage' element={<LoginPage />} /> {/* Login Page Route */}
        <Route path='/RegisterPage' element={<RegisterPage />} /> {/* Register Page Route */}
        <Route path='/FeaturesPage' element={<FeaturesPage />} /> {/* Features Page Route */}
        
        {/* Admin Routes */}
        <Route path='/ListOfUserPage' element={<ListOfUserPage />} /> {/* List of User Page Route (Admin) */}
        <Route path='/ListOfVehiclePage' element={<ListOfVehiclePage />} /> {/* List of Vehicle Page Route (Admin) */}
        <Route path='/UserRequestCompletionPage' element={<UserRequestCompletionPage />} /> {/* User Request Completion Page Route (Admin) */}
        <Route path='/ReportPage' element={<ReportPage />} /> {/* Report Page Route (Admin) */}
        
        {/* User Vehicle (Owner) Routes */}
        <Route path='/AddVehiclePage' element={<AddVehiclePage />} /> {/* Add Vehicle Page Route (User Vehicle Owner) */}
        <Route path='/ViewVehiclePage' element={<ViewVehiclePage />} /> {/* View Vehicle Page Route (User Vehicle Owner) */}
        
        {/* User Booking Routes */}
        <Route path='/BookingLogPage' element={<BookingLogPage />} /> {/* Booking Log Page Route (User Booking) */}
        <Route path='/ViewVehicleBookingPage' element={<ViewVehicleBookingPage />} /> {/* View Vehicle Booking Page Route (User Booking) */}
        <Route path='/BookingValidationPage' element={<BookingValidationPage />}/> {/* Booking Validation Page Route (User Booking) */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
