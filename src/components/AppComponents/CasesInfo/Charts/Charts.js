import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { useWindowResize } from '../../../commonUI/customHooks/customHooks'
import { SECONDBREAK_POINT } from '../../../commonUI/Ui/breakpoints'
import Button from '../../../commonUI/Ui/Button/Button.component'
import { Github } from '../../../commonUI/Ui/UI'
import { DataContext } from '../../../Context/NewDataContext'
import './Charts.scss'
//import Rates from './Rates/Rates'
const Charts = () => {
    const Months = ['Jan', 'Feb','March', 'April','May', 'June','July', 'Aug','Sept', 'Oct','Nov', 'Dec']
    const { history,trackColor,trackNum,country } = React.useContext(DataContext)
    const [ width ] = useWindowResize()
    const data= {
        series :[{
            name: "Cases",
            data: history[trackNum]
        }],
        options: {
            chart: {
              height: '100%',
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
              <h3>
                <span>Monthly Spike Analysis :&nbsp;</span>
                <span>&nbsp;{country}</span>
              </h3>
              <div>
             
              </div>
              <ReactApexChart
              width="100%"
              options={data.options} 
              series={data.series} 
              type="area" 
              height={width <= SECONDBREAK_POINT ? 480 : 350} />
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
