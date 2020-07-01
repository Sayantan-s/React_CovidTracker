import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { GlobalUrl } from '../../../../axios'

const LineG = ({Country}) => {
    const [linedata,setData] = useState({
        active : [],
        recovered : [],
        death : []
    })
    const FetchData = (sample) =>
    {
        const cases = Object.values(sample.timeline.cases)
        const recovered = Object.values(sample.timeline.recovered)
        const deaths = Object.values(sample.timeline.deaths) 
       const RecovDiff = recovered.map((each,id) =>
        {
            return recovered[id+1] - each
        }).filter((each,id) => !! each).map(each => Math.abs(each))
        const DeathsDiff = deaths.map((each,id) =>
        {
            return deaths[id+1] - each
        }).filter((each,id) => !! each).map(each => Math.abs(each))
        const active = cases.map((each,id) =>
        (
            each - recovered[id] - deaths[id]
        ))
        const ActiveDiff = active.map((each,id) =>
        {
            return active[id+1] - each
        }).filter((each,id) => !! each).map(eaxh => Math.abs(eaxh))
        setData({
            recovered : RecovDiff,
            death : DeathsDiff,
            active : ActiveDiff
        })
    }
    useEffect(() =>
    {
        GlobalUrl.get(`/historical/india?lastdays=30`)
        .then(resp =>
            {  
               FetchData(resp.data)
            })
            .catch(err =>
            {
                console.log(err)
            })
        if(Country)
        {
            const newCountry = Country !== null ? Country.toLowerCase() : null
            GlobalUrl.get(`/historical/${newCountry}?lastdays=30`)
            .then(resp =>
                {
                    FetchData(resp.data)
                })
            .catch(err =>
                {
                    console.log(err)
                })
        }
    },[Country])
    const series = [{
        name : 'Active',
        data : linedata.active
    },
    {
        name : 'Recovered',
        data : linedata.recovered
    },
    {
        name : 'Deaths',
        data : linedata.death
    }]
    const options = {
        colors: ['#f46527', '#56CEB1', '#3F6484'],
        chart :{
            type : 'line',
            toolbar : {
                show : false
            },
            offsetX : 0,
            offsetY : 0,
            dropShadow : {
                enabled : true,
                top: 0,
                left: 0,
                blur: 3,
                color: '#000',
                opacity: 0.35
            }
        },
        stroke : {
            width : 5,
            curve : 'smooth',
        },
        grid:{
            strokeDashArray : 3,
            padding:{top:0,left:-35,right:-10},
            xaxis:{lines:{show:false}},
            yaxis:{lines:{show:false}}
        },
        yaxis:{
            show:false
        },
        title : {
            text: `30day data ^`,
            align: 'left',
            offsetX: 10,
            offsetY: 10,
            floating: false,
            style: {
                fontSize:  '15px',
                fontWeight:  'bold',
                fontFamily:  "Montserrat', sans-serif",
                color:  '#263238'
            }
        },
        legend :{
            position : 'top',
            offsetX: -13,
            offsetY: 5,
            horizontalAlign: 'left',
        },
        xaxis: {
        floating : true,
        show : false
        },
        tooltip: {
            enabled : false
        }, 
    }
    return (
      <ReactApexChart options={options} series={series}  width="100%" height="336px"type="line"/>
    )
}

export default LineG
