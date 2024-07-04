import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const fetchData = async () => {
  try {
    const bookingRequestsRef = collection(db, 'BookingRequests');
    const vehicleDetailsRef = collection(db, 'VehicleDetails');

    const bookingRequestsSnapshot = await getDocs(bookingRequestsRef);
    const vehicleDetailsSnapshot = await getDocs(vehicleDetailsRef);

    const bookingRequestsData = bookingRequestsSnapshot.docs.map(doc => doc.data());
    const vehicleDetailsData = vehicleDetailsSnapshot.docs.map(doc => doc.data());

    return { bookingRequests: bookingRequestsData, vehicleDetails: vehicleDetailsData };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { bookingRequests: [], vehicleDetails: [] }; // Return empty arrays or handle error
  }
};

export default fetchData;
