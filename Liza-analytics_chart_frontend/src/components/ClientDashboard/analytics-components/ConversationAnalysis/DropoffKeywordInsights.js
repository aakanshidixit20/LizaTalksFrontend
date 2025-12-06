// import React from 'react'


// import ReactApexChart from "react-apexcharts";

// const DropoffKeywordInsights = () => {
//   const [state, setState] = React.useState({
          
//             series: [{
//               name: 'Permanent Drop-off',
//               data: [44, 55, 41, 37, 22, 43, 21]
//             }, {
//               name: 'Resumed Session',
//               data: [53, 32, 33, 52, 13, 43, 32]
//             }],
//             options: {
//               chart: {
//                 type: 'bar',
//                 height: 350,
//                 stacked: true,
//               },
//               plotOptions: {
//                 bar: {
//                   horizontal: true,
//                   dataLabels: {
//                     total: {
//                       enabled: true,
//                       offsetX: 0,
//                       style: {
//                         fontSize: '13px',
//                         fontWeight: 900
//                       }
//                     }
//                   }
//                 },
//               },
//               stroke: {
//                 width: 1,
//                 colors: ['#fff']
//               },
//               title: {
//                 text: ''
//               },
//               xaxis: {
//                 categories: ['Effects of Indica vs Sativa', 'CBD oil for anxiety dosage', 'Dispensary near me THC &CBD', 'Difference between THC &CBD', 'How to get a medical card', '[State] weed laws', 'Best vape pens 2024'],
//                 labels: {
//                   formatter: function (val) {
//                     return val
//                   }
//                 }
//               },
//               yaxis: {
//                 title: {
//                   text: undefined
//                 },
//               },
//               tooltip: {
//                 y: {
//                   formatter: function (val) {
//                     return val + "K"
//                   }
//                 }
//               },
//               fill: {
//                 opacity: 1
//               },
//               legend: {
//                 position: 'top',
//                 horizontalAlign: 'left',
//                 offsetX: 40
//               }
//             },
          
          
//         });

        

//         return (
//           <div>
//             <h3>Drop-off Keyword Insights</h3>
//             <p>User Drop-offs vs. Resumed Sessions by Last Keyword</p>
//             <div id="chart">
//                 <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
//               </div>
//             <div id="html-dist"></div>
//           </div>
//         );
// }

// export default DropoffKeywordInsights




import React from "react";
import ReactApexChart from "react-apexcharts";
 
const PRIMARY_PURPLE = "#6D5DD2";
const SECONDARY_PURPLE = "#9B8BFF";
const GREEN = "#33D6A6";
 
const DropoffKeywordInsights = ({ filter, preview, full }) => {
 
  // Mock dynamic dataset
  const datasets = {
    week: [12, 20, 14, 10, 6, 18, 9],
    month: [44, 55, 41, 37, 22, 43, 21],
    "3months": [120, 140, 110, 98, 90, 130, 95],
  };
 
  const resumedSessions = {
    week: [15, 18, 11, 17, 4, 14, 10],
    month: [53, 32, 33, 52, 13, 43, 32],
    "3months": [150, 130, 125, 160, 70, 140, 120],
  };
 
  const labels = [
    "Effects of Indica vs Sativa",
    "CBD oil for anxiety dosage",
    "Dispensary near me THC &CBD",
    "Difference between THC &CBD",
    "How to get a medical card",
    "[State] weed laws",
    "Best vape pens 2024",
  ];
 
  const chartData = datasets[filter] || datasets.month;
  const resumeData = resumedSessions[filter] || resumedSessions.month;
 
  const series = [
    { name: "Permanent Drop-off", data: chartData },
    { name: "Resumed Session", data: resumeData },
  ];
 
  const options = {
    chart: {
      stacked: true,
      toolbar: { show: false },
    },
    colors: [PRIMARY_PURPLE, GREEN], // Purple + Green
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "60%",
        borderRadius: 1,
        dataLabels: {
          total: {
            enabled: true,
            style: { color: "#000", fontWeight: 600 },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontWeight: 600,
        colors: ["#fff"],
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      labels: {
        colors: "#4A4A4A",
      },
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
    },
    xaxis: {
      categories: labels,
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
  };
 
  return (
    <div style={{ paddingTop: full ? "10px" : "0px" }}>
      {full && (
        <>
          <h3 style={{ color: PRIMARY_PURPLE, marginBottom: "4px" }}>
            Drop-off Keyword Insights
          </h3>
          <p style={{ opacity: 0.6, marginTop: 0 }}>
            User drop-offs vs resumed sessions by last message keyword.
          </p>
        </>
      )}
 
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={preview ? 220 : 350}
      />
    </div>
  );
};
 
export default DropoffKeywordInsights;