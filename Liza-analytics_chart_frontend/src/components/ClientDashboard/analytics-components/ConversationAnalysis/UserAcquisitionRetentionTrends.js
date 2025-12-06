// import React from 'react'
// import ReactApexChart from "react-apexcharts";

// const UserAcquisitionRetentionTrends = () => {
//  const [state, setState] = React.useState({
          
//             series: [{
//               name: 'New Users',
//               data: [31, 40, 28, 51, 42, 109, 100]
//             }, {
//               name: 'Returning Users',
//               data: [11, 32, 45, 32, 34, 52, 41]
//             }],
//             options: {
//               chart: {
//                 height: 350,
//                 type: 'area'
//               },
//               dataLabels: {
//                 enabled: false
//               },
//               stroke: {
//                 curve: 'smooth'
//               },
//               xaxis: {
//                 type: 'Day',
//                 categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
//               },
//               tooltip: {
//                 x: {
//                   format: 'dd/MM/yy HH:mm'
//                 },
//               },
//             },
          
          
//         });

        

//         return (
//           <div>
//             <h3>User Acquisition & Retention Trends</h3>
//             <p>New vs. Returning Users Daily Volume</p>
//             <div id="chart">
//                 <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
//               </div>
//             <div id="html-dist"></div>
//           </div>
//         );
// }

// export default UserAcquisitionRetentionTrends


import React from "react";
import ReactApexChart from "react-apexcharts";
 
const UserAcquisitionRetentionTrends = () => {
  const [state] = React.useState({
    series: [
      {
        name: "New Users",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Returning Users",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
 
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: { show: false },
      },
 
      colors: ["#6D5DD2", "#33D6A6"], // Purple + Green Trend Colors
 
      dataLabels: {
        enabled: false,
      },
 
      stroke: {
        curve: "smooth",
        width: 3,
      },
 
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.35,
          opacityTo: 0.1,
          stops: [0, 95, 100],
        },
      },
 
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: 500,
            colors: "#7A7A7A",
          },
        },
      },
 
      yaxis: {
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: 500,
            colors: "#7A7A7A",
          },
        },
      },
 
      tooltip: {
        theme: "light",
        x: {
          format: "dd MMM HH:mm",
        },
      },
 
      legend: {
        position: "top",
        horizontalAlign: "left",
        labels: {
          colors: "#444",
        },
        markers: {
          width: 10,
          height: 10,
          strokeWidth: 0,
          radius: 8,
        },
      },
 
      grid: {
        strokeDashArray: 4,
        borderColor: "#E6E6E6",
      },
    },
  });
 
  return (
    <div>
      <h3 style={{ marginBottom: "6px", color: "#6D5DD2" }}>
        User Acquisition & Retention Trends
      </h3>
      <p style={{ marginTop: 0, opacity: 0.6 }}>
        New vs Returning Users Daily Volume
      </p>
 
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};
 
export default UserAcquisitionRetentionTrends;
 
 