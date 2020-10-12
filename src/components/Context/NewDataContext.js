import React, { useState } from 'react'
import { GlobeV3URL } from '../../axios';
import { useAxFetch } from '../commonUI/customHooks/customHooks';
export const DataContext = React.createContext();
const NewDataContext = ({children}) => {
    const [country,setCountry] = useState("all")
    const [HistoryData,setData] = useState([])
    const [cn,setCn] = useState('Global')
    const [tracCol,setCol] = useState('#f6c879')
    const [trackNo,setNum] = useState(0)
    const [cooOr,setCo] = useState({
        lat : -7.461,
        lng: -10.938
    })
    const [countryID,setID] = useState(0)
    const Resp = useAxFetch(GlobeV3URL,`countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=false`)
    React.useEffect(() => {
        GlobeV3URL(`historical/${country}?lastdays=30`)
        .then(resp => {
            if(country === 'all') {
                setData(resp.data)
            }
            else setData(resp.data.timeline)
        })
        .catch(err => console.log(err))
    },[country])
    const historicals = (history => {
        return Object.values(history).map(data => {
            const dateData = Object.values(data)
            return dateData.map((data,id) => {
                return dateData[id + 1] - data
            }).filter(data => !!data)
        })
     })(HistoryData)
     console.log(Resp)
    const [zoom,setZoom] = useState(3)
    const Data = Resp.resp.map(cn => {
        return{
            cases :cn.cases,
            active : cn.active,
            newCases : cn.todayCases,
            deaths : cn.deaths,
            newDeaths :cn.todayDeaths,
            recovered :cn.recovered,
            newRecovered : cn.todayRecovered,
            country: cn.country,
            flag:cn.countryInfo.flag,
            lat:cn.countryInfo.lat,
            long:cn.countryInfo.long,
            iso : cn.countryInfo.iso3,
        }
    })
    return (
        <DataContext.Provider value={{
            Data : Data,
            country : cn,
            id : countryID,
            latitude : cooOr.lat,
            longitude : cooOr.lng,
            history : historicals,
            trackColor : tracCol,
            trackNum : trackNo,
            setCos : (lat,long) => {
                setCo({
                    lat : lat,
                    lng : long
                })
            },
            zoom : zoom,
            setZoom : zoom => {
                setZoom(zoom)
            },
            setCountry : country => {
                setCountry(country)
            },
            setColor : color => {
                setCol(color)
            },
            setNum : num => {
                setNum(num)
            },
            setCn : country => {
                setCn(country)
            },
            setID : (id) => {
                setID(id)
            }
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default React.memo(NewDataContext)
