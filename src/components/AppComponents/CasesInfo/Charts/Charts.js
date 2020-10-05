import React from 'react'
import ReactApexChart from 'react-apexcharts'
import Button from '../../../commonUI/Ui/Button/Button.component'
import { Github } from '../../../commonUI/Ui/UI'
import { DataContext } from '../../../Context/NewDataContext'
import './Charts.scss'
const Charts = () => {
    const Months = ['Jan', 'Feb','March', 'April','May', 'June','July', 'Aug','Sept', 'Oct','Nov', 'Dec']
    const { history,trackColor,trackNum,country } = React.useContext(DataContext)
    const data= {
        series :[{
            name: "Cases",
            data: history[trackNum]
        }],
        options: {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              },
              toolbar:{show:false}
            },
            color: trackColor,
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth',
              colors:[trackColor]
            },
            xaxis: { axisBorder:{ show : false },axisTicks:{show:false},labels:{show :true} },
            title: {
            text: `Monthly Spike Analysis : ${country}`,
              align: 'left',
              style: {
                fontSize:  '14px',
                fontWeight:  'bold',
                fontFamily:  'Poppins',
                color:  '#65676A'
              },
            },
            yaxis : {
                labels: {
                    offsetX: -30,
                    offsetY: 0
                },
            },
            fill: {
                colors: "#f6c879",
                gradient: {
                    shade: 'light',
                    type: "vertical",
                    shadeIntensity: 1,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 0.8,
                    opacityTo: 0,
                    colorStops: []
                }
              },              
            grid: {
                strokeDashArray : 5,
                borderColor: '#65676A',
                padding : {top: 0,left: -20,right: -20},
                xaxis :{lines: {show: true}},
                yaxis :{lines: {show: false}},
            },
        }
    }
    return (
        <div className="charts">
              <ReactApexChart
              width="100%"
              options={data.options} 
              series={data.series} 
              type="area" 
              height={350} />
              <h1 className="charts-updated">
                  <span className="charts-updated--1">Updated</span>{" "}
                  <span className="charts-updated--2">{new Date().getDate()}{" "}{Months[new Date().getMonth()]}</span>
              </h1>
              <a
              target="_blank" 
              rel="noopener noreferrer"
              href="https://github.com/Sayantanvisca" 
              className="charts-btn">
                <Button>
                    <span><Github /></span>
                    <span>Github</span>
                </Button>
              </a>
        </div>
    )
}

export default Charts
