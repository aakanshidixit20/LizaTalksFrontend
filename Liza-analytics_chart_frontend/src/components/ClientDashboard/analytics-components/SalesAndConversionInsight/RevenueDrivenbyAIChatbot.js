// import React from 'react'
// import ReactApexChart from 'react-apexcharts';

// const RevenueDrivenbyAIChatbot = () => {
//    const [state, setState] = React.useState({
          
//             series: [44, 55, 13, 33],
//             options: {
//               chart: {
//                 width: 380,
//                 type: 'donut',
//               },
//               dataLabels: {
//                 enabled: false
//               },
//               responsive: [{
//                 breakpoint: 480,
//                 options: {
//                   chart: {
//                     width: 200
//                   },
//                   legend: {
//                     show: false
//                   }
//                 }
//               }],
//               legend: {
//                 position: 'right',
//                 offsetY: 0,
//                 height: 230,
//               }
//             },
          
          
//         });

        
//           function appendData() {
//           var arr = state.series.slice()
//           arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
        
//           setState({
//             ...state,
//             series: arr
//           })
//         }
        
//         function removeData() {
//           if(state.series.length === 1) return
          
//           var arr = state.series.slice()
//           arr.pop()
        
//           setState({
//             ...state,
//             series: arr
//           })
//         }
        
//         function randomize() {
//           setState({
//             ...state,
//             series: state.series.map(function() {
//               return Math.floor(Math.random() * (100 - 1 + 1)) + 1
//             })
//           })
//         }
        
//         function reset() {
//           setState({
//             ...state,
//             series: [44, 55, 13, 33]
//           })
//         }
        

//         return (
//           <div>
//             <div>
//               <h3>Revenue Driven by AI Chatbot</h3>
//                 <div class="chart-wrap">
//                   <div id="chart">
//                 <ReactApexChart options={state.options} series={state.series} type="donut" width={380} />
//               </div>
//                 </div>
              
//                 <div class="actions">
//                   <button
                      
//                       onClick={() => appendData()}
//                       >
//                     + ADD
//                   </button>
                   
//                   <button
                      
//                       onClick={() => removeData()}
//                       >
//                     - REMOVE
//                   </button>
                   
//                   <button
                      
//                       onClick={() => randomize()}
//                       >
//                     RANDOMIZE
//                   </button>
                   
//                   <button
                      
//                       onClick={() => reset()}
//                       >
//                     RESET
//                   </button>
//                 </div>
//               </div>
//             <div id="html-dist"></div>
//           </div>
//         );
// }

// export default RevenueDrivenbyAIChatbot;


// #PALAKCODe
import React from "react";
import { Card, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const RevenueDrivenbyAIChatbot = () => {

  const options = {
    chart: { type: "donut" },
    labels: ["Upsell", "Cross-Sell", "Chat Assist", "Automation Sales"],
    colors: ["#4F46E5", "#22C55E", "#FACC15", "#EF4444"],
    legend: { position: "right" },
    dataLabels: {
      enabled: true,
      formatter: (v) => `${v.toFixed(1)}%`,
      style: { fontSize: "14px" },
    },
  };

  const series = [42, 30, 15, 13];

  return (
    <Card sx={{ p: 3, borderRadius: 4, mt: 3 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Revenue Driven by AI Chatbot
      </Typography>

      <ReactApexChart 
        options={options} 
        series={series} 
        type="donut" 
        height={350} 
      />
    </Card>
  );
};

export default RevenueDrivenbyAIChatbot;

