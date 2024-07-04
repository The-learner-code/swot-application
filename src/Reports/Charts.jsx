import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Grid, Paper, Typography, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { collection, getDocs } from 'firebase/firestore'; // Adjust this import based on your Firebase setup
import { db } from '../firebase'; // Adjust this import based on your Firebase setup
import './chart.css';

// Registering chart.js components and plugins
ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

async function fetchBookingData() {
  const bookingRef = collection(db, 'BookingRequests'); // Reference to 'BookingRequests' collection
  const querySnapshot = await getDocs(bookingRef); // Fetching documents from the collection
  const bookings = querySnapshot.docs.map(doc => doc.data()); // Mapping document data to an array
  console.log("Fetched booking data:", bookings); // Logging fetched data
  return bookings;
}

const Charts = () => {
  const [bookingData, setBookingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [vehicleType, setVehicleType] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All');
  const [month, setMonth] = useState(new Date().getMonth() + 1); // default to current month

  useEffect(() => {
    async function fetchData() {
      const data = await fetchBookingData();
      setBookingData(data);
      setFilteredData(data);
    }
    fetchData();
  }, []);

  const handleVehicleTypeChange = (event) => {
    const type = event.target.value;
    setVehicleType(type);
    filterData(type, timeFilter, month);
  };

  const handleTimeFilterChange = (event) => {
    const time = event.target.value;
    setTimeFilter(time);
    filterData(vehicleType, time, month);
  };

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);
    filterData(vehicleType, timeFilter, selectedMonth);
  };

  const filterData = (vehicleType, timeFilter, month) => {
    let filtered = bookingData;

    if (vehicleType !== 'All') {
      filtered = filtered.filter(booking => booking.vehicleType === vehicleType);
    }

    if (timeFilter !== 'All') {
      filtered = filtered.filter(booking => {
        const bookingDate = new Date(booking.timestamp);
        return bookingDate.getMonth() + 1 === month;
      });
    }

    setFilteredData(filtered);
  };

  const getStatusCounts = (data) => {
    const statusCounts = data.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(statusCounts),
      datasets: [{
        label: 'Number of Bookings',
        data: Object.values(statusCounts),
        backgroundColor: Object.keys(statusCounts).map(status => {
          if (status === 'Confirmed') return 'rgba(75, 192, 75, 0.6)';
          if (status === 'Declined') return 'rgba(255, 99, 132, 0.6)';
          if (status === 'Booked - Waiting Confirmation') return 'rgba(255, 205, 86, 0.6)';
          return 'rgba(75, 192, 192, 0.6)';
        }),
        borderColor: Object.keys(statusCounts).map(status => {
          if (status === 'Confirmed') return 'rgba(75, 192, 75, 1)';
          if (status === 'Declined') return 'rgba(255, 99, 132, 1)';
          if (status === 'Booked - Waiting Confirmation') return 'rgba(255, 205, 86, 1)';
          return 'rgba(75, 192, 192, 1)';
        }),
        borderWidth: 1,
      }]
    };
  };

  const getPercentData = (data) => {
    const statusCounts = data.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1;
      return acc;
    }, {});

    const total = data.length;

    return Object.keys(statusCounts).reduce((acc, key) => {
      acc[key] = ((statusCounts[key] / total) * 100).toFixed(2);
      return acc;
    }, {});
  };

  const percentData = getPercentData(filteredData);

  return (
    <Grid className="placement-result-container">
      <Grid className="placement-result-item">
        <Paper className="placement-result-paper">
          <Typography variant="h6" gutterBottom align="center">
            Booking Status by Vehicle Type
          </Typography>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel>
            <Select
              labelId="vehicle-type-label"
              id="vehicle-type"
              value={vehicleType}
              onChange={handleVehicleTypeChange}
              label="Vehicle Type"
              sx={{ height: 35 }} // Adjust the height value as needed
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Car">Car</MenuItem>
              <MenuItem value="Bike">Bike</MenuItem>
            </Select>
          </FormControl>
          <div className="filter-container">
            <FormControl variant="outlined" margin="normal" className="time-filter">
              <InputLabel id="time-filter-label">Time Filter</InputLabel>
              <Select
                labelId="time-filter-label"
                id="time-filter"
                value={timeFilter}
                onChange={handleTimeFilterChange}
                label="Time Filter"
                sx={{ height: 35 }} // Adjust the height value as needed
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Month">Month</MenuItem>
              </Select>
            </FormControl>
            {timeFilter !== 'All' && (
              <FormControl variant="outlined" margin="normal" className="month-filter">
                <InputLabel id="month-label">Month</InputLabel>
                <Select
                  labelId="month-label"
                  id="month"
                  value={month}
                  onChange={handleMonthChange}
                  label="Month"
                  sx={{ height: 35 }} // Adjust the height value as needed
                >
                  {[...Array(12).keys()].map(i => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleString('default', { month: 'long' })}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>
          <Bar
            data={getStatusCounts(filteredData)}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Booking Status by Vehicle Type'
                },
                datalabels: {
                  anchor: 'start',
                  align: 'end',
                  formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return `${percentData[label]}%`;
                  },
                  font: {
                    weight: 'bold',
                  },
                  color: 'black',
                }
              },
              scales: {
                x: {
                  ticks: {
                    callback: function(value, index, values) {
                      const label = this.getLabelForValue(value);
                      return label === 'Booked - Waiting Confirmation' ? 'Waiting' : label;
                    }
                  }
                },
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Charts;
