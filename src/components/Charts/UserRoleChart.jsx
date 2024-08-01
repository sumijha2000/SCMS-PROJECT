import React, { useEffect, useState } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale, LineElement } from 'chart.js';
import './UserRoleChartStyles.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale, LineElement);

const UserRoleChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('pie'); // Default chart type

  useEffect(() => {
    const fetchUserRoleCounts = async () => {
      try {
        const response = await fetch('http://localhost:5164/getuserrolecounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventID: '1001',
            addInfo: {},
          }),
        });

        const data = await response.json();

        if (data.rStatus === 0) {
          const roleCounts = data.rData.roleCounts || {};
          const labels = Object.keys(roleCounts);
          const counts = Object.values(roleCounts);

          console.log('Labels:', labels);
          console.log('Counts:', counts);

          // Set colors: Yellow for Managers, Black for Suppliers
          const backgroundColors = labels.map(role => role.toLowerCase() === 'manager' ? '#004B95' : '#519DE9');
          
          setChartData({
            labels,
            datasets: [
              {
                data: counts,
                backgroundColor: backgroundColors, // Apply colors
                borderColor: '#fff',
                borderWidth: 1,
              },
            ],
          });
        } else {
          setError(data.rData.rMessage || 'Unknown error occurred');
        }
      } catch (err) {
        setError('Error fetching data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoleCounts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const chartOptions = {
    pie: {
      plugins: {
        legend: { position: 'top' },
        tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}` } },
      },
    },
    bar: {
      plugins: {
        legend: { position: 'top' },
        tooltip: { callbacks: { label: (tooltipItem) => `Count: ${tooltipItem.raw}` } },
      },
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}` } },
      },
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
    },
    line: {
      plugins: {
        legend: { position: 'top' },
        tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}` } },
      },
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}` } },
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { display: false } },
      },
    },
  };

  const ChartComponent = {
    pie: Pie,
    bar: Bar,
    line: Line,
  }[chartType] || Pie;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>

      <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#333', fontWeight: 'bold' }}>User Roles Distribution</h2>
      <div style={{ position: 'relative', width: '250px', height: '250px', margin: '0 auto' }}>
        <ChartComponent data={chartData} options={chartOptions[chartType]} />
      </div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button style={{ backgroundColor: '#007bff', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '12px 24px', cursor: 'pointer', fontSize: '1rem', transition: 'background-color 0.3s, transform 0.2s' }} onClick={() => setChartType('pie')}>Pie Chart</button>
        <button style={{ backgroundColor: '#007bff', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '12px 24px', cursor: 'pointer', fontSize: '1rem', transition: 'background-color 0.3s, transform 0.2s' }} onClick={() => setChartType('bar')}>Bar Chart</button>
        <button style={{ backgroundColor: '#007bff', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '12px 24px', cursor: 'pointer', fontSize: '1rem', transition: 'background-color 0.3s, transform 0.2s' }} onClick={() => setChartType('line')}>Line Chart</button>
      </div>
    </div>
  );
};

export default UserRoleChart;
