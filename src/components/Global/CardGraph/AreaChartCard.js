import React from 'react'
import ReactApexChart from 'react-apexcharts'

const AreaChartCard = ({Data,Names}) => {
    const series =[{
        data: Data
      }];

    const options = {
        colors:['#fff'],
        grid:{
            strokeDashArray : 3,
            padding:{top:0,left:-35,right:-10},
            xaxis:{lines:{show:false}},
            yaxis:{lines:{show:false}}
        },
        fill:{
            type:"gradient",
            opacity:0.9
        },
        title: {
          text: '',
          align: 'left'
        },
        subtitle: {
          text: '',
          align: 'left'
        },
        chart: {
          type: 'area',
          toolbar:{
              show:false
          },
          offsetY : 28 
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight',
        },
        yaxis:{
            show:false
        },
        xaxis: {
        axisBorder : {show : false},
        axisTicks :{show : false},
        floating:true
        },
        tooltip: {
            enabled : false
          },
        legend:{
          show: true,
          labels :{
            colors : "#A889D3",
            useSeriesColors : true
          }
        }
      };
    return (
    <ReactApexChart options={options} series={series} type="area" width="100%" height="410px" />
    )
}

export default AreaChartCard
