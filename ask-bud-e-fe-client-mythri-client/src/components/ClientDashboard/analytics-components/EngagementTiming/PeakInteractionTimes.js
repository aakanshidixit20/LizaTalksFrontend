import React from 'react'
import ReactApexChart from 'react-apexcharts';

const PeakInteractionTimes = () => {
   const [state, setState] = React.useState({
          
            series: [{
              name: 'Browsing Volume',
              type: 'column',
              data: [440, 505, 414, 671, 227, 413, 201, 352]
            }, {
              name: 'Sales-Weighted Rate',
              type: 'line',
              data: [23, 42, 35, 27, 43, 22, 17, 31]
            }],
            options: {
              chart: {
                height: 350,
                type: 'line',
              },
              stroke: {
                width: [0, 4]
              },
              title: {
                text: 'Peak Interaction Times (Sales-Weighted)'
              },
              dataLabels: {
                enabled: true,
                enabledOnSeries: [1]
              },
              labels: ['8:00-10:00', '10:00-12:00','12:00-14:00','14:00-16:00','16:00-18:00','18:00-20:00','20:00-22:00','22:00-24:00'],
              yaxis: [{
                title: {
                  text: 'Browsing Volume (Units)',
                },
              
              }, {
                opposite: true,
                title: {
                  text: 'Sales-Weighted Rate'
                }
              }]
            },
          
          
        });

        

        return (
          <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
              </div>
            <div id="html-dist"></div>
          </div>
        );
}

export default PeakInteractionTimes;