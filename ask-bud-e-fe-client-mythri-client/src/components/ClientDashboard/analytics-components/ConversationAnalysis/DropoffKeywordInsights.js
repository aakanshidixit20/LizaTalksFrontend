import React from 'react'
import ReactApexChart from "react-apexcharts";

const DropoffKeywordInsights = () => {
  const [state, setState] = React.useState({
          
            series: [{
              name: 'Permanent Drop-off',
              data: [44, 55, 41, 37, 22, 43, 21]
            }, {
              name: 'Resumed Session',
              data: [53, 32, 33, 52, 13, 43, 32]
            }],
            options: {
              chart: {
                type: 'bar',
                height: 350,
                stacked: true,
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                  dataLabels: {
                    total: {
                      enabled: true,
                      offsetX: 0,
                      style: {
                        fontSize: '13px',
                        fontWeight: 900
                      }
                    }
                  }
                },
              },
              stroke: {
                width: 1,
                colors: ['#fff']
              },
              title: {
                text: ''
              },
              xaxis: {
                categories: ['Effects of Indica vs Sativa', 'CBD oil for anxiety dosage', 'Dispensary near me THC &CBD', 'Difference between THC &CBD', 'How to get a medical card', '[State] weed laws', 'Best vape pens 2024'],
                labels: {
                  formatter: function (val) {
                    return val
                  }
                }
              },
              yaxis: {
                title: {
                  text: undefined
                },
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return val + "K"
                  }
                }
              },
              fill: {
                opacity: 1
              },
              legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40
              }
            },
          
          
        });

        

        return (
          <div>
            <h3>Drop-off Keyword Insights</h3>
            <p>User Drop-offs vs. Resumed Sessions by Last Keyword</p>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
              </div>
            <div id="html-dist"></div>
          </div>
        );
}

export default DropoffKeywordInsights