import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement } from 'chart.js';
import './SupplierTransactionChartStyles.css';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement);

const SupplierTransactionChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('bar'); // Default chart type

  useEffect(() => {
    const fetchSupplierTransactionData = async () => {
      try {
        const response = await fetch('http://localhost:5164/getsuppliertransactiondata', {
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
          const ordersByProduct = data.rData.ordersByProduct || {};
          const ordersByDate = data.rData.ordersByDate || {};

          // Data for the 'bar' chart type
          const productLabels = Object.keys(ordersByProduct);
          const productValues = Object.values(ordersByProduct);

          // Data for the 'line' chart type
          const dateLabels = Object.keys(ordersByDate).map(date => new Date(date).toLocaleDateString());
          const dateValues = Object.values(ordersByDate);

          setChartData({
            bar: {
              labels: productLabels,
              datasets: [
                {
                  label: 'Orders by Product',
                  data: productValues,
                  backgroundColor: '#4BC0C0',
                  borderColor: '#1D8CF8',
                  borderWidth: 1,
                },
              ],
            },
            line: {
              labels: dateLabels,
              datasets: [
                {
                  label: 'Orders by Date',
                  data: dateValues,
                  backgroundColor: '#FF6384',
                  borderColor: '#FF6384',
                  borderWidth: 1,
                },
              ],
            },
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

    fetchSupplierTransactionData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Select chart component and data based on chartType
  const ChartComponent = {
    bar: Bar,
    line: Line,
  }[chartType] || Bar;

  return (
    <div className="chart-container">
      <h2 className="chart-title">Supplier Transactions Data</h2>
      {chartData[chartType] && chartData[chartType].labels ? (
        <ChartComponent data={chartData[chartType]} />
      ) : (
        <p>No data available for the selected chart type.</p>
      )}
      <div className="chart-controls">
        <button className="chart-button" onClick={() => setChartType('bar')}>Bar Chart</button>
        <button className="chart-button" onClick={() => setChartType('line')}>Line Chart</button>
      </div>
    </div>
  );
};

export default SupplierTransactionChart;
