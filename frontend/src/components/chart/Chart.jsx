import React from 'react'
import Chart from "react-apexcharts"

function Charts() {

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun' , 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

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
            colors: '#ffffff',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#ffffff',
          },
        },
      },
      legend: {
        labels: {
          colors: '#ffffff',
        },
      },
      grid: {
        show: false,
      },
    },
    series: [
      {
        name: "Deposits",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        color: '#254138'
      },
      {
        name: "Withdrawals",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
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