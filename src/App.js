import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Homepage';
import ContactPage from './pages/Contact';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/ContactPage' element={<ContactPage />} />
        <Route path='/LoginPage' element={<LoginPage />} />
        <Route path='/RegisterPage' element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;