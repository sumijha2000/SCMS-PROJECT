import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement } from 'chart.js';
import './TransactionChartStyles.css';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement);

const TransactionChart = () => {
  const [chartData, setChartData] = useState({ products: [], amountsByProduct: [], dates: [], amountsByDate: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('bar'); // Default chart type

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch('http://localhost:5164/getorderdata', {
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
        console.log(data);

        if (data.rStatus === 0) {
          const ordersByProduct = data.rData.ordersByProduct || {};
          const ordersByDate = data.rData.ordersByDate || {};

          setChartData({
            products: Object.keys(ordersByProduct),
            amountsByProduct: Object.values(ordersByProduct),
            dates: Object.keys(ordersByDate),
            amountsByDate: Object.values(ordersByDate),
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

    fetchOrderData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const barChartData = {
    labels: chartData.products,
    datasets: [
      {
        label: 'Amount by Product',
        data: chartData.amountsByProduct,
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: chartData.dates,
    datasets: [
      {
        label: 'Amount by Date',
        data: chartData.amountsByDate,
        fill: false,
        borderColor: '#FF5722',
        tension: 0.1,
      },
    ],
  };

  const ChartComponent = {
    bar: Bar,
    line: Line,
  }[chartType] || Bar;

  return (
    <div className="chart-container">
      <h2 className="chart-title">Manager Transaction Data</h2>
      <ChartComponent data={chartType === 'bar' ? barChartData : lineChartData} options={{ responsive: true }} />
      <div className="chart-controls">
        <button className="chart-button" onClick={() => setChartType('bar')}>Bar Chart</button>
        <button className="chart-button" onClick={() => setChartType('line')}>Line Chart</button>
      
      </div>
    </div>
  );
};

export default TransactionChart;
