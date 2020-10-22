import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { useWindowResize,useAxFetch } from '../../../commonUI/customHooks/customHooks'
import Button from '../../../commonUI/Ui/Button/Button.component'
import { Github } from '../../../commonUI/Ui/UI'
import { DataContext } from '../../../Context/NewDataContext'
import { GlobeV3URL } from '../../../../axios.js'
import './Charts.scss'
import Rates from './Rates/Rates'
const Charts = (props,ref) => {
    const Months = ['Jan', 'Feb','March', 'April','May', 'June','July', 'Aug','Sept', 'Oct','Nov', 'Dec']
    const { history,trackColor,trackNum,country,link } = React.useContext(DataContext)
    const { resp : {
      active,
      cases,
      deaths,
      recovered
    } } = useAxFetch(GlobeV3URL,link)
    const [ width ] = useWindowResize()
    const perCal = type => ((type/cases)*100).toFixed( width < 380 ? 1 : 2)
    const Colors = ['rgb(246, 200, 121)','rgb(92, 193, 172)','rgb(79, 78, 83)']
    const Percentage = {
      Active : perCal(active),
      Recovery : perCal(recovered),
      Death : perCal(deaths)
    }
    const perData = []
    for(let [key,value] of Object.entries(Percentage)){
      perData.push({
        type : key,
        rate : value
      })
    }
    const data= {
        series :[{
            name: trackNum === 0 ? "Active" : trackNum === 1 ? "Recovered" : "Deaths" ,
            data: history[trackNum]
        }],
        options: {
            chart: {
              height: '100%',
              type: 'line',
              zoom: {
                enabled: false
              },
              toolbar:{show:false},
            },
            markers: {
              size : 5,
              colors: '#fff',
              strokeColors: trackNum === 0 ? "#f6c879" : trackNum === 1 ? "#5cc1ac" : "#4f4e53",
              strokeWidth: 2,
            },
            tooltip: {
              enabled: true,
              enabledOnSeries: undefined,
              shared: true,
              followCursor: false,
              intersect: false,
              inverseOrder: false,
              custom: undefined,
              fillSeriesColor: false,
              theme: "dark",
              style: {
                fontSize: '12px',
                fontFamily: 'Poppins'
              },
              onDatasetHover: {
                  highlightDataSeries: false,
              },
              x: { show: false },
              y: {
                  formatter: undefined,
                  title: {
                      formatter: seriesName => seriesName,
                  },
              },
              z: {
                  formatter: undefined,
                  title: 'Size: '
              },
              marker: {
                  show: true,
              },
              items: {
                 display: "flex",
              },
              fixed: {
                  enabled: false,
                  position: 'topRight',
                  offsetX: 0,
                  offsetY: 0,
              },
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
        <div className="charts" ref={ref}>
              <h3>
                <span>Monthly Spike Analysis :&nbsp;</span>
                <span>&nbsp;{country}</span>
              </h3>
              <div className="charts-rate">
               {
                 perData && perData.map((items,id) => {
                   return {
                     ...items,
                     bgCol : Colors[id]
                   }
                 }).map(type => {
                   return <Rates
                   key={type.type} 
                   {...type}/>
                 })
               }
              </div>
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
              href="https://github.com/Sayantan-s" 
              className="charts-btn">
                <Button>
                    <span><Github /></span>
                    <span>Github</span>
                </Button>
              </a>
        </div>
    )
}

export default React.forwardRef(Charts)
