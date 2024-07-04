import React, { useEffect, useState, useRef } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { Bar } from 'react-chartjs-2';
import { db } from '../firebase'; // Import your Firebase db instance

const Charts = () => {
  const [vehicleData, setVehicleData] = useState(null);
  const chartRef = useRef(null); // Reference for the chart

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        // Example: Fetching VehicleDetails from Firebase
        const vehicleDetailsRef = collection(db, 'VehicleDetails');
        const snapshot = await getDocs(vehicleDetailsRef);
        
        // Process data for Vehicle Types chart
        const vehicleCounts = {
          Car: 0,
          Bike: 0,
        };

        snapshot.forEach(doc => {
          const data = doc.data();
          // Assuming 'date' is a field representing the date of the record
          const month = data.date.toDate().getMonth(); // Extracting the month (0-indexed)

          if (data.vehicleType === 'Car') {
            vehicleCounts.Car++;
          } else if (data.vehicleType === 'Bike') {
            vehicleCounts.Bike++;
          }
          // You can add further logic here based on your date structure
        });

        setVehicleData({
          labels: ['Car', 'Bike'], // Labels for the chart
          datasets: [
            {
              label: 'Vehicle Types',
              backgroundColor: ['#8884d8', '#82ca9d'], // Colors for bars
              borderColor: ['#8884d8', '#82ca9d'],
              borderWidth: 1,
              hoverBackgroundColor: ['#8884d8', '#82ca9d'],
              hoverBorderColor: ['#8884d8', '#82ca9d'],
              data: [vehicleCounts.Car, vehicleCounts.Bike], // Data for bars
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error or set default state
      }
    };

    fetchDataFromFirebase();
  }, []); // Empty dependency array ensures it runs only once on mount

  useEffect(() => {
    // Cleanup chart instance on component unmount
    return () => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  if (!vehicleData) {
    return <Typography>Loading...</Typography>; // Optional loading indicator
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <Typography variant="h6" align="center" gutterBottom>
            Monthly Vehicle Counts
          </Typography>
          <Bar
            ref={chartRef}
            data={vehicleData}
            options={{
              plugins: {
                tooltip: {
                  enabled: true,
                },
                legend: {
                  display: true,
                  position: 'top',
                },
              },
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Charts;
