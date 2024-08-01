import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const TransactionTrackingChart = () => {
  const data = {
    labels: ['Pending', 'Processing', 'Completed', 'Cancelled'],
    datasets: [{
      label: 'Transaction Tracking',
      data: [15, 30, 50, 10],
      backgroundColor: [
        '#FF6384', // Pending
        '#36A2EB', // Processing
        '#4BC0C0', // Completed
        '#FFCE56', // Cancelled
      ],
      borderColor: '#fff',
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} transactions`,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default TransactionTrackingChart;
