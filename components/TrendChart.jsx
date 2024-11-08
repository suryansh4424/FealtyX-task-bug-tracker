import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../styles/TrendChart.module.css'; 


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TrendChart = ({ tasks }) => {
  
  const getChartData = () => {
    
    const taskDates = tasks.map(task => new Date(task.date).toLocaleDateString());
    const taskCountPerDay = {};

    taskDates.forEach((date) => {
      taskCountPerDay[date] = (taskCountPerDay[date] || 0) + 1;
    });

    
    const labels = Object.keys(taskCountPerDay).sort((a, b) => new Date(a) - new Date(b));
    const data = labels.map(date => taskCountPerDay[date]);

    return {
      labels,
      datasets: [
        {
          label: 'Tasks Worked On Per Day',
          data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)', 
          tension: 0.1,  
          pointBackgroundColor: 'rgb(75, 192, 192)', 
        },
      ],
    };
  };

  return (
    <div className={styles.chartContainer}>
      <h2>Tasks Worked On Trend</h2>
      <Line
        data={getChartData()}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date',
              },
              ticks: {
                maxRotation: 45,  
                minRotation: 0,
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Tasks',
              },
              beginAtZero: true,  // Start the Y-axis from 0
            },
          },
        }}
      />
    </div>
  );
};

export default TrendChart;
