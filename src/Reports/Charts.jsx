import React, { useEffect, useState } from 'react'; // Importing necessary React hooks
import { Bar } from 'react-chartjs-2'; // Importing Bar component from react-chartjs-2 for displaying charts
import { Grid, Paper, Typography, MenuItem, FormControl, Select, InputLabel } from '@mui/material'; // Importing grid, paper, typography, form controls, and select components from Material-UI
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Importing necessary components from Chart.js library
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importing Chart.js plugin for adding data labels to charts
import { collection, getDocs } from 'firebase/firestore'; // Adjust this import based on your Firebase setup
import { db } from '../firebase'; // Adjust this import based on your Firebase setup
import './chart.css';

// Registering chart.js components and plugins
ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

// Function to fetch booking data from Firestore
async function fetchBookingData() {
  const bookingRef = collection(db, 'BookingRequests'); // Reference to 'BookingRequests' collection
  const querySnapshot = await getDocs(bookingRef); // Fetching documents from the collection
  const bookings = querySnapshot.docs.map(doc => doc.data()); // Mapping document data to an array
  console.log("Fetched booking data:", bookings); // Logging fetched data
  return bookings;
}

const Charts = () => {
  // State variables to manage data and filters
  const [bookingData, setBookingData] = useState([]); // State for storing all booking data
  const [filteredData, setFilteredData] = useState([]); // State for storing filtered booking data
  const [vehicleType, setVehicleType] = useState('All'); // State for selected vehicle type filter
  const [timeFilter, setTimeFilter] = useState('All'); // State for selected time filter
  const [month, setMonth] = useState(new Date().getMonth() + 1); // State for selected month filter, defaulting to current month

  // Effect hook to fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      const data = await fetchBookingData(); // Fetch booking data from Firestore
      setBookingData(data); // Set booking data to state
      setFilteredData(data); // Initialize filtered data with all booking data
    }
    fetchData(); // Invoke fetchData function
  }, []); // Empty dependency array ensures useEffect runs once on mount

  // Event handler for vehicle type filter change
  const handleVehicleTypeChange = (event) => {
    const type = event.target.value; // Get selected vehicle type from event
    setVehicleType(type); // Update vehicle type filter state
    filterData(type, timeFilter, month); // Call filter function with updated filters
  };

  // Event handler for time filter change
  const handleTimeFilterChange = (event) => {
    const time = event.target.value; // Get selected time filter from event
    setTimeFilter(time); // Update time filter state
    filterData(vehicleType, time, month); // Call filter function with updated filters
  };

  // Event handler for month filter change
  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value; // Get selected month from event
    setMonth(selectedMonth); // Update month filter state
    filterData(vehicleType, timeFilter, selectedMonth); // Call filter function with updated filters
  };

  // Function to filter data based on vehicle type, time filter, and month
  const filterData = (vehicleType, timeFilter, selectedMonth) => {
    let filtered = bookingData; // Start with all booking data

    // Filter by vehicle type if selected
    if (vehicleType !== 'All') {
      filtered = filtered.filter(booking => booking.vehicleType === vehicleType);
    }

    // Filter by month if selected
    if (timeFilter !== 'All') {
      filtered = filtered.filter(booking => {
        const parts = booking.timestamp.split(', '); // Splitting into date and time parts
        const dateParts = parts[0].split('/').map(Number); // Splitting date part into day, month, year
        const [day, month, year] = dateParts;
        const bookingMonth = month; // Assuming month is 1-indexed

        return bookingMonth === selectedMonth;
      });
    }

    setFilteredData(filtered); // Set filtered data to state
  };

  // Function to calculate counts of each booking status
  const getStatusCounts = (data) => {
    const statusCounts = data.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1; // Increment count for each status
      return acc;
    }, {});

    return {
      labels: Object.keys(statusCounts), // Labels for each status
      datasets: [{
        label: 'Number of Bookings', // Dataset label
        data: Object.values(statusCounts), // Data values (counts)
        backgroundColor: Object.keys(statusCounts).map(status => {
          // Colors for each status based on type
          if (status === 'Confirmed - KYC Completed with User') return 'rgba(75, 192, 75, 0.6)'; // green
          if (status === 'Declined - Discussed with User') return 'rgba(255, 99, 132, 0.6)'; // red
          if (status === 'Booked - Waiting Confirmation') return 'rgba(255, 205, 86, 0.6)'; // yellow
          return 'rgba(75, 192, 192, 0.6)';
        }),
        borderColor: Object.keys(statusCounts).map(status => {
          // Border colors for each status based on type
          if (status === 'Confirmed - KYC Completed with User') return 'rgba(75, 192, 75, 0.6)'; // green
          if (status === 'Declined - Discussed with User') return 'rgba(255, 99, 132, 1)'; // red
          if (status === 'Booked - Waiting Confirmation') return 'rgba(255, 205, 86, 1)'; // yellow
          return 'rgba(75, 192, 192, 1)';
        }),
        borderWidth: 1,
      }]
    };
  };

  // Function to calculate percentage of each booking status
  const getPercentData = (data) => {
    const statusCounts = data.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1; // Increment count for each status
      return acc;
    }, {});

    const total = data.length; // Total number of bookings

    return Object.keys(statusCounts).reduce((acc, key) => {
      acc[key] = ((statusCounts[key] / total) * 100).toFixed(2); // Calculate percentage for each status
      return acc;
    }, {});
  };

  const percentData = getPercentData(filteredData); // Percent data for filtered bookings

  // JSX structure for rendering the chart and filters
  return (
    <Grid className="placement-result-container">
      <Grid className="placement-result-item">
        <Paper className="placement-result-paper">
          <Typography variant="h6" gutterBottom align="center">
            Booking Status by Vehicle Type
          </Typography>
          {/* Dropdown for selecting vehicle type */}
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
          {/* Container for time and month filters */}
          <div className="filter-container">
            {/* Dropdown for selecting time filter */}
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
            {/* Dropdown for selecting month, visible only when month filter is selected */}
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
          {/* Bar chart to display booking status counts */}
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
                    return `${percentData[label]}%`; // Formatting label with percentage data
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
                    callback: function (value, index, values) {
                      const label = this.getLabelForValue(value);
                      if (label === 'Booked - Waiting Confirmation') {
                        return 'Waiting'; // Custom label for 'Booked - Waiting Confirmation'
                      }
                      if (label === 'Confirmed - KYC Completed with User') {
                        return 'Confirmed'; // Custom label for 'Confirmed - KYC Completed with User'
                      }
                      if (label === 'Declined - Discussed with User') {
                        return 'Cancelled'; // Custom label for 'Declined - Discussed with User'
                      }
                    }
                  }
                },
                y: {
                  beginAtZero: true // Start y-axis from zero
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
