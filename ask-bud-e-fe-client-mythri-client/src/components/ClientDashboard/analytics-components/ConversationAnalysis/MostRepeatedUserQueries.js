import React from 'react'
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const MostRepeatedUserQueries = () => {
 const [state, setState] = React.useState({
          
            series: [{
              data: [400, 370, 348, 270, 250, 180, 150]
            }],
            options: {
              chart: {
                type: 'bar',
                height: 350
              },
              plotOptions: {
                bar: {
                  borderRadius: 4,
                  borderRadiusApplication: 'end',
                  horizontal: true,
                }
              },
              dataLabels: {
                enabled: false
              },
              xaxis: {
                categories: ['Dispensary near me', 'Sativa vs Indica', 'THC percentage', 'Medical card requirements', 'Edible dosage', 'Delivery options', 'California weed laws' ],
              }
            },
          
          
        });

        

        return (
          <div>
            <h3>Most Repeated User Queries</h3>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
              </div>
            <div id="html-dist"></div>
          </div>
        );
}

export default MostRepeatedUserQueries;