// OrderChart.jsx
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const OrderChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderStatusCounts = async () => {
      try {
        const response = await fetch('http://localhost:5164/orderchartservice', {
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
console.log(data ,'data api ')
        if (data.rStatus === 0) {
          const statusCounts = data.rData.statusCounts || {};
          const labels = Object.keys(statusCounts);
          const counts = Object.values(statusCounts);

          setChartData({
            labels,
            datasets: [
              {
                data: counts,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
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

    fetchOrderStatusCounts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Order Status Distribution</h2>
      <div style={{ width: '250px', height: '250px' }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default OrderChart;
