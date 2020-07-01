import React, { useEffect, useState } from 'react'
import { GlobalUrl } from '../../axios'
import styled from 'styled-components'
import AreaChartCard from './CardGraph/AreaChartCard'
import { IoIosArrowDropupCircle } from 'react-icons/io'
import Tilt from 'react-tilt'

const GlobalData = () => {
    const [GlobalInfo,setData] = useState([])
    const [Historical,setHistory] = useState(
        {
            Cases : [],
            Recovered : [],
            Deaths : [],
            Actives : []
        }
    )
    useEffect(() =>
    {
        GlobalUrl.get(`/all`)
        .then(resp =>
            {
                setData(resp.data)
            })
        .catch(err =>
            {
                console.log(err)
            })
    },[])
    useEffect(() =>
    {
        GlobalUrl.get('/historical/all')
        .then(resp =>
            {
                const CaseDiff = Object.values(resp.data.cases).map((each,id) =>
                {
                    return Object.values(resp.data.cases)[id+1] - each
                }).filter(each => !!each).map(each => Math.abs(each))
                const actives = Object.values(resp.data.cases).map((each,id) =>
                {
                    return each - Object.values(resp.data.recovered)[id]
                }).map((each,id) =>
                {
                    return each - Object.values(resp.data.deaths)[id]
                })
                const ActiveDiff = actives.map((each,id) =>
                {
                    return actives[id+1] - each
                }).filter(each => !!each).map(each => Math.abs(each))
                const RecoveredDiff = Object.values(resp.data.recovered).map((each,id) =>
                {
                    return Object.values(resp.data.recovered)[id+1] - each
                }).filter(each => !!each).map(each => Math.abs(each))
                const DeathDiff =  Object.values(resp.data.deaths).map((each,id) =>
                {
                    return  Object.values(resp.data.deaths)[id+1] - each
                }).filter(each => !!each).map(each => Math.abs(each))
                setHistory(
                    {
                        Cases : CaseDiff,
                        Actives : ActiveDiff,
                        Recovered : RecoveredDiff,
                        Deaths : DeathDiff
                    }
                )
            })
        .then(err =>
            {
                console.log(err);
            })
    },[])
    const Cards=[
        {
            styles:"linear-gradient(to right, #e53935, #e35d5b)",
            color : "rgb(255, 196, 196)",
            CardFront:{
                type:"Total",
                CurrData:GlobalInfo.cases,
                NewCase:GlobalInfo.todayCases,
                HistoryData : Historical.Cases
                
            },
            CardBack:{
                affc:"Affected Countries.",
                affectedCountries:GlobalInfo.affectedCountries,
                type:"Cases per million",
                PerOneMillion: GlobalInfo.casesPerOneMillion,
                tN:"Total tests",
                ts:GlobalInfo.tests,
                tPM:"Tests per million",
                tPerOneMillion:GlobalInfo.testsPerOneMillion
            }
        },
        {
            styles:"linear-gradient(to right, #ff512f, #f09819)",
            color:"rgb(255, 222, 201)",
            CardFront:{
                type:"Active",
                CurrData:GlobalInfo.active,
                NewCase:GlobalInfo.todayCases,
                HistoryData : Historical.Actives
            },
            CardBack:{
                type:"Active per million",
                PerOneMillion:GlobalInfo.activePerOneMillion,
                tN:"Critical Cases",
                ts:GlobalInfo.critical,
                tPM:"Critical per million",
                tPerOneMillion:GlobalInfo.criticalPerOneMillion,
            }
        },
        {
            styles:"linear-gradient(to right, #4cb8c4, #3cd3ad)",
            color:'rgb(201, 255, 238)',
            CardFront:{
                type:"Recovered",
                CurrData:GlobalInfo.recovered,
                NewCase:GlobalInfo.todayRecovered,
                HistoryData : Historical.Recovered
                
            },
            CardBack:{
               type:"Recovered per million",
               PerOneMillion:GlobalInfo.recoveredPerOneMillion
            }
        },
        {
            styles:"linear-gradient(to right, #4b79a1, #283e51)",
            color:"rgb(193, 193, 193)",
            CardFront:{
                type:"Deaths",
                CurrData:GlobalInfo.deaths,
                NewCase:GlobalInfo.todayDeaths,
                HistoryData : Historical.Deaths
          
            },
            CardBack:{
               type:"Deaths per million",
               PerOneMillion:GlobalInfo.deathsPerOneMillion
            }
        }
    ]
    const Globals = styled.div`
    display:flex;
    flex-wrap:wrap;
    flex-direction:row;
    justify-content:space-between;
    `
    const Wrapper= styled.div`
      position:relative;
      transition:0.8s all;
      height:400px;
      width:400px;
      margin-bottom:20px;
      perspective:1000px;
      overflow :hidden;
    `
    const Card= styled.div`
    width:100%;
    height:100%;
    position:absolute;
    backface-visibility:hidden;
    transform-style:preserve-3d;
    transition:1s all;
    &:active{
        transform: rotateY(180deg);
    }
    `
    const Front = styled.div`
    position:absolute;
    backface-visibility:hidden;
    color:black;
    width:100%;
    height:100%;
    border-radius:0.5rem;
    transform:rotateY(0deg);
    `
    const FrontInfo = styled.div`
    width:100%;
    height:fit-content;
    display : flex;
    flex-flow : column;
    flex-wrap: wrap;
    justify-content:space-between;
    text-align:justify;
    position : absolute;
    top:10px;
    left: 20px;
    `


    const Back = styled.div`
    position:absolute;
    backface-visibility:hidden;
    color:white;
    width:100%;
    height:100%;
    display:flex;
    padding:15px;
    flex-direction:column;
    flex-wrap:wrap;
    justify-content:space-between;
    text-align:center;
    transform:rotateY(180deg);
    border-radius:0.5rem;
    h4
    {
        font-weight: 500;
    }`
    const CardBackInfos = styled.div`
    text-align:justify;
    padding:10px;
    border-radius:0.5rem;
    background:rgba(255, 255, 255, 0.3);`

    return (
        <Globals>
            {   
                Cards.map((each,index) =>
                (   
                
                    <Tilt options={{
                        max:            25,     
                        perspective:    500,   
                        scale:          1,      
                        speed:          1000,   
                        transition:     true,  
                        axis:           null,   
                        reset:          true, 
                        easing:         "cubic-bezier(.03,.98,.52,.99)"
                    }}><Wrapper key={index}>
                        <Card>
                            <Front style={{background:each.styles,color:"#fff"}}>
                            <FrontInfo>
                                    <h5 style={{fontWeight:500}}>{each.CardFront.type}</h5>
                                    <div style={{fontWeight:700,fontSize:"50px",marginTop:-15}}>{(each.CardFront.CurrData/1000).toFixed(2)}K</div>
                                    <div style={{fontSize:"17px",marginTop:-5}}>{each.CardFront.NewCase} <IoIosArrowDropupCircle /></div>
                            </FrontInfo>
                                <div style={{flex: 3.1}} ><AreaChartCard Data={each.CardFront.HistoryData} Names={each.CardFront.type}/></div>
                            </Front>
                            <Back style={{background:each.styles}}>
                               <h4>Aditional Infos</h4>
                                <CardBackInfos>
                                    <h3>{each.CardBack.type}</h3>
                                    <div>{each.CardBack.PerOneMillion}</div>
                                    <h3>{each.CardBack.affc}</h3>
                                    <div>{each.CardBack.affectedCountries}</div>
                                    <h3>{each.CardBack.tN}</h3>
                                    <div>{each.CardBack.ts}</div>
                                    <h3>{each.CardBack.tPM}</h3>
                                    <div>{each.CardBack.tPerOneMillion}</div>
                                </CardBackInfos>
                               <h6 style={{opacity:0.5}}>CovidApi.all</h6>
                            </Back>
                        </Card>
                    </Wrapper></Tilt>
                ))
            }
        </Globals>
    )
}

export default GlobalData