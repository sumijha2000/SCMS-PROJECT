import React, { useEffect, useState } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale, LineElement } from 'chart.js';
import './CombinedChartStyles.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale, LineElement);

const CombinedChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('pie'); // Default chart type
  const [currentChart, setCurrentChart] = useState('order'); // Default to Order Chart

  useEffect(() => {
    const fetchData = async (chart) => {
      try {
        const endpoint = chart === 'order' 
          ? 'http://localhost:5164/orderchartservice' 
          : 'http://localhost:5164/getuserrolecounts';
          
        const response = await fetch(endpoint, {
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
          const dataKey = chart === 'order' ? 'statusCounts' : 'roleCounts';
          const counts = data.rData[dataKey] || {};
          const labels = Object.keys(counts);
          const values = Object.values(counts);

          setChartData({
            labels,
            datasets: [
              {
                data: values,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
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

    fetchData(currentChart);
  }, [currentChart]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  const ChartComponent = {
    pie: Pie,
    bar: Bar,
    line: Line,
  }[chartType] || Pie;

  return (
    <div className="chart-container">
      <h2 className="chart-title">{currentChart === 'order' ? 'Order Status Distribution' : 'User Roles Distribution'}</h2>
      <div className="chart-wrapper">
        <ChartComponent data={chartData} />
      </div>
      <div className="chart-controls">
        <button className="chart-button" onClick={() => setCurrentChart('order')}>Order Chart</button>
        <button className="chart-button" onClick={() => setCurrentChart('user')}>User Roles Chart</button>
        <button className="chart-button" onClick={() => setChartType('pie')}>Pie Chart</button>
        <button className="chart-button" onClick={() => setChartType('bar')}>Bar Chart</button>
        <button className="chart-button" onClick={() => setChartType('line')}>Line Chart</button>
      </div>
    </div>
  );
};

export default CombinedChart;
