import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Registerpage from './Pages/AccountCreation';
import Loginpage from './Pages/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/Register' element={<Registerpage />} />
        <Route path='/Login' element={<Loginpage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;