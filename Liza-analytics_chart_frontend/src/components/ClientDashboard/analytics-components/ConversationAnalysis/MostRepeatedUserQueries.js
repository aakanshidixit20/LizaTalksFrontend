// import React from 'react'
// import { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';

// const MostRepeatedUserQueries = () => {
//  const [state, setState] = React.useState({
          
//             series: [{
//               data: [400, 370, 348, 270, 250, 180, 150]
//             }],
//             options: {
//               chart: {
//                 type: 'bar',
//                 height: 350
//               },
//               plotOptions: {
//                 bar: {
//                   borderRadius: 4,
//                   borderRadiusApplication: 'end',
//                   horizontal: true,
//                 }
//               },
//               dataLabels: {
//                 enabled: false
//               },
//               xaxis: {
//                 categories: ['Dispensary near me', 'Sativa vs Indica', 'THC percentage', 'Medical card requirements', 'Edible dosage', 'Delivery options', 'California weed laws' ],
//               }
//             },
          
          
//         });

        

//         return (
//           <div>
//             <h3>Most Repeated User Queries</h3>
//             <div id="chart">
//                 <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
//               </div>
//             <div id="html-dist"></div>
//           </div>
//         );
// }

// export default MostRepeatedUserQueries;


import React from "react";
import ReactApexChart from "react-apexcharts";
 
const MostRepeatedUserQueries = () => {
  const [state] = React.useState({
    series: [
      {
        name: "Query Count",
        data: [400, 370, 348, 270, 250, 180, 150],
      },
    ],
 
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
 
      colors: ["#6D5DD2"], // Purple theme
 
      plotOptions: {
        bar: {
          borderRadius: 6,
          horizontal: true,
          borderRadiusApplication: "end",
        },
      },
 
      dataLabels: {
        enabled: false,
      },
 
      xaxis: {
        categories: [
          "Dispensary near me",
          "Sativa vs Indica",
          "THC percentage",
          "Medical card requirements",
          "Edible dosage",
          "Delivery options",
          "California weed laws",
        ],
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: 500,
            colors: "#6A6A6A",
          },
        },
      },
 
      grid: {
        strokeDashArray: 4,
        borderColor: "#E6E6E6",
      },
 
      tooltip: {
        enabled: true,
        theme: "light",
      },
    },
  });
 
  return (
    <div>
      <h3 style={{ marginBottom: "8px", color: "#6D5DD2" }}>
        Most Repeated User Queries
      </h3>
 
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};
 
export default MostRepeatedUserQueries;