import React from 'react'
import ReactApexChart from 'react-apexcharts'

const Donut = ({GraphData,Divider}) => {
          
    const series = GraphData.map(each => Math.abs(((each/Divider) * 100).toFixed(2)))
    const options = {
        colors: ['#f46527', '#56CEB1', '#3F6484'],
        legend: {
            position : 'left',
            offsetX: -13,
            offsetY: 15,
          },
          chart: {
            type: 'donut',
            dropShadow: {
                enabled: true,
                top: 25,
                left: -50,
                blur: 10,
                opacity: 0.1
              },
              offsetX : 0,
              offsetY : 0
          },
          labels:['Active','Recovered','Deaths'],
          plotOptions :{
            pie : {
                startAngle : 0,
                offsetX : -25,
                offsetY : -5,
                customScale : 0.95,
            },
            donut:{
              background : 'transparent',
              labels : false
            }
          },
          title: {
            text: 'Fatality check%',
            align: 'left',
            offsetX : 10,
            offsetY : 10,
            floating: false,
            style: {
            fontSize:  '15px',
            fontWeight:  'bold',
            fontFamily:  "Montserrat', sans-serif",
            color:  '#263238'
            },
          },
          subtitle: {
            text: '',
            align: 'left'
          },
          dataLabels : {
            enabled : false,
          },
          stroke : {
            show : false,
          },
          fill : {
            colors: ['#f46527', '#56CEB1', '#3F6484']
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: "100%",
                toolbar :{
                    show:false
                }
              },
              dataLabels : {
                  enabled : false
              },
            }
          }]
        }
    return (
        <ReactApexChart options={options} series={series} type="donut" width="100%" height="100%"/>
    )
}

export default Donut
