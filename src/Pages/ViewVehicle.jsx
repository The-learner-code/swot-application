import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import '../Styles/viewvehicle.css';
import Sidebar from '../Components/Sidebar/Book_Sidebar';
import Navbar from '../Components/Header/Navbar';
import { useNavigate } from 'react-router-dom';

const ViewVehicle = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, 'VehicleDetails'),
          where('status', '==', 'Available'),
          //where('vehicleType', '==', 'Car')
        );
        const querySnapshot = await getDocs(q);
        const vehiclesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVehicles(vehiclesData);
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
      }
    };

    fetchData();
  }, []);

  const handleVehicleClick = (vehicle) => {
    navigate('/BookingDetailspage', { state: { vehicle } });
  };

  return (
    <div className='ViewVehicle'>
      <Sidebar />
      <div className="ViewVehiclecontainer">
        <Navbar />
        <div className='Block'>
          <div className='vehicle-grid'>
            {vehicles.map((vehicle, index) => (
              <div key={index} className='vehicle-block' onClick={() => handleVehicleClick(vehicle)}>
                <img className='vehicle-img' src={vehicle.imageUrl} alt="Vehicle" />
                <p>Type: {vehicle.vehicleType}</p>
                <p>Seating Size: {vehicle.seatingSize}</p>
                <p>Available From: {new Date(vehicle.availableFrom).toLocaleDateString()}</p>
                <p>Available To: {new Date(vehicle.availableTo).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewVehicle;
