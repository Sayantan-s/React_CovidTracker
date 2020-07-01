import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import RegionalTab from './RegionalComponents/RegionalTab'
import { covidURL } from '../../../axios'
import Donut from './RegionalComponents/Donut'
import LineG from './RegionalComponents/LineG'

const Regional = ({CountryName}) => {
    const date =`${new Date().getFullYear()}-${"0" + (new Date().getMonth() + 1)}-${new Date().getUTCDate()}`
    const [RegionalInfo,setInfo] = useState([])
    const [GraphInfo,setGraph] = useState([])
    useEffect(() =>
    {
        covidURL.get(`/${date}/country/india`)
        .then(resp =>
            {
                setInfo(resp.data.dates[`${date}`].countries.India.regions)
                setGraph(resp.data.dates[`${date}`].countries.India)
            })
        .catch(err =>
            {
                console.log(err)
            })
        if(CountryName)
        {
            covidURL.get(`/${date}/country/${CountryName}`)
            .then(resp =>
                {
                    setInfo(resp.data.dates[`${date}`].countries[`${CountryName}`].regions)
                    setGraph(resp.data.dates[`${date}`].countries[`${CountryName}`])
                })
            .catch(resp =>
                {
                    setInfo(resp.data.dates[`${date}`].countries.India.regions)
                    setGraph(resp.data.dates[`${date}`].countries.India)
                })
        }
    },[date,CountryName])
    return (
      <RegionContainer>
          <div className="Regional-tab">
               <RegionalTab CountryData={RegionalInfo}/>
          </div>
          <div className="Graph-Container">
            <div className="Line">
                <LineG Country={CountryName}/>
            </div>
            <div className="Donut">
                <Donut GraphData={
                    [
                        GraphInfo.today_open_cases,
                        GraphInfo.today_recovered,
                        GraphInfo.today_deaths
                    ]
                    }
                    Divider={GraphInfo.today_confirmed}/>
            </div>
          </div>
      </RegionContainer>
    )
}

export default Regional

const RegionContainer = styled.div`
display : flex;
width:100%;
height : 100%;
flex-direction:column;
flex-wrap:flex-wrap;
justify-content:space-between;
overflow:scroll-behavior;
& > div
{
    width:100%;
    height : 100%;
}
.Regional-tab{
    flex:2;
    padding : 0 20px;
    background:white;
    border-radius : 0.5rem;
    margin-bottom : 20px;
}
.Graph-Container{
    flex:1.9;
    display:flex;
    flex-direction:row;
    flex-wrap:flex-wrap;
    justify-content:space-between;
    overflow:scroll-behavior;
    & > div
    {
        width:100%;
        height : 100%;
    }
    .Line{
        flex:2;
        background:linear-gradient(to right, #e0eafc, #cfdef3);
        border-radius : 0.5rem;
    }
    .Donut{
        flex:1.7;
    }
}
`