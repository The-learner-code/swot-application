import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Homepage';
import ContactPage from './pages/Contact';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import FeaturesPage from './pages/Features';
import ReportPage from './pages/Report';
import ListOfUserPage from './Admin/ListOfUser';
import ListOfVehiclePage from './Admin/ListOfVehicle';
import UserRequestCompletionPage from './Admin/UserRequestCompletion';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/ContactPage' element={<ContactPage />} />
        <Route path='/LoginPage' element={<LoginPage />} />
        <Route path='/RegisterPage' element={<RegisterPage />} />
        <Route path='/FeaturesPage' element={<FeaturesPage />} />
        {/* Admin */}
        <Route path='/ListOfUserPage' element={<ListOfUserPage />} />
        <Route path='/ListOfVehiclePage' element={<ListOfVehiclePage />} />
        <Route path='/UserRequestCompletionPage' element={<UserRequestCompletionPage />} />
        <Route path='/ReportPage' element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;