// toastService.js
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Initialize ToastContainer with global settings
const toastContainer = (
  <ToastContainer 
    position="top-center" 
    autoClose={2000} 
    hideProgressBar={false} 
    newestOnTop={false} 
    closeOnClick 
    rtl={false} 
    pauseOnFocusLoss 
    draggable 
    pauseOnHover 
  />
);

// Export toast and toastContainer for use in other components
export { toast, toastContainer };


//import { toast, toastContainer } from '../toastservice';