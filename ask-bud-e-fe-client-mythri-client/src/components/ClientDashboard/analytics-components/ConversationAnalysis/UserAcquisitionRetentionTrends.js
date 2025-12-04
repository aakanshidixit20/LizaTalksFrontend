import React from 'react'
import ReactApexChart from "react-apexcharts";

const UserAcquisitionRetentionTrends = () => {
 const [state, setState] = React.useState({
          
            series: [{
              name: 'New Users',
              data: [31, 40, 28, 51, 42, 109, 100]
            }, {
              name: 'Returning Users',
              data: [11, 32, 45, 32, 34, 52, 41]
            }],
            options: {
              chart: {
                height: 350,
                type: 'area'
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              xaxis: {
                type: 'Day',
                categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
              },
              tooltip: {
                x: {
                  format: 'dd/MM/yy HH:mm'
                },
              },
            },
          
          
        });

        

        return (
          <div>
            <h3>User Acquisition & Retention Trends</h3>
            <p>New vs. Returning Users Daily Volume</p>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
              </div>
            <div id="html-dist"></div>
          </div>
        );
}

export default UserAcquisitionRetentionTrends