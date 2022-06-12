import React from 'react'
import Chart from "react-apexcharts"

function Charts() {

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

  // chart
  const chartContent = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: months,
        labels: {
          style: {
            // colors: '#ffffff',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            // colors: '#ffffff',
          },
          formatter: function (value) {
            return "$" + value;
          }
        },
      },
      legend: {
        labels: {
          // colors: '#ffffff',
        },
      },
      grid: {
        show: false,
      },
    },
    series: [
      {
        name: "Deposits",
        data: [440, 550, 570, 560, 610, 580],
        color: '#254138'
      },
      {
        name: "Withdrawals",
        data: [350, 410, 360, 260, 450, 480],
        color: '#ff9d22'
      },
    ]
  }

  return (
    <Chart
      // className='sales-chart'
      options={chartContent.options}
      series={chartContent.series}
      type="bar"
      height= '350'
      // width='500'
    />
  )
}

export default Charts