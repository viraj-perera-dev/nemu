import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

function GoldPriceChart() {
  const [goldData, setGoldData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch gold price data from the new API
    fetch('https://crm.careholding.it/ws/Call/?Cat=Oro&met=GetQuotazioniMonthOro&np=2')
      .then(response => response.json())
      .then(data => {
        // Map the response data to the required format for the chart
        const goldPrices = data.map(entry => ({
          date: new Date(entry.DataRiferimento).toLocaleDateString(),
          goldPrice: entry.EurPm // Using Euro PM price for the chart
        }));
        // Update state with the processed data
        setGoldData(goldPrices);
      })
      .catch(error => {
        console.error('Error fetching gold price data:', error);
      });
  }, []);

  useEffect(() => {
    // Create the chart
    if (chartRef.current && goldData.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: goldData.map(item => item.date),
          datasets: [{
            label: 'Gold Price',
            data: goldData.map(item => item.goldPrice),
            borderColor: 'gold',
            fill: false,
            tension: 0.4 // Adjust the tension for curved lines
          }]
        },
        options: {
          animation: {
            duration: 1000, // Animation duration in milliseconds
            easing: 'easeInOutQuart' // Easing function for the animation
          }
        }
      });

      return () => {
        // Destroy the previous chart instance when the component unmounts
        newChartInstance.destroy();
      };
    }
  }, [goldData]);

  return (
    <div>
      <h2>Gold Price Line Chart (From 2000 to Today)</h2>
      <canvas ref={chartRef} width="800" height="500"></canvas>
    </div>
  );
}

export default GoldPriceChart;
