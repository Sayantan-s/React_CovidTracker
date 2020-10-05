import React from 'react'
import { Map as LeafletMap,TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { PlotURl } from '../../../axios'
import { Circle,Popup } from 'react-leaflet'
import { GoPrimitiveDot } from 'react-icons/go'
import { InfoContext } from '../../Context/DataContext'
const WorldMap = () => {
    const [mapCenter,setCenter] = React.useState({
        lat : 20.80,
        lng: -30.4796
    })
    const [mapZoom,setMapZoom] = React.useState(3)
    const [AffectedArea,setAreaRed] = React.useState({
        country : [],
        coordinates : [],
        Status : []
    })
    const { NGcountry } = React.useContext(InfoContext)
    const fetchData = () => {
        PlotURl.get('/countries')
         .then(resp => {
             console.log(resp.data.data)
            setAreaRed({
                country : resp.data.data.map(({location}) => location),
                coordinates : resp.data.data.map(each =>{
                    return {
                        lat : each.latitude,
                        lng : each.longitude
                    }
                }),
                Status : resp.data.data.map(each => {
                    return{
                        confirmed : each.confirmed,
                        recovered : each.recovered,
                        deaths : each.dead
                    }
                })
            })
            if(NGcountry){
                setCenter(AffectedArea.coordinates[AffectedArea.country.indexOf(NGcountry)])
                setMapZoom(7)
            }
         })
    }
    React.useEffect(() =>
    {
      fetchData()
    },[NGcountry])
    const caseColors ={
        confirmed : {
            hex : ' #EA5455',
            multiplier : 800
        },
        recovered :{
            hex : '#81FBB8',
            multiplier : 1200
        },
        deaths :{
            hex : '#97ABFF',
            multiplier : 2000
        }
    };
    return (
       <div className="Table-WM">
           <LeafletMap 
           center={mapCenter} 
           zoom={mapZoom} 
           maxZoom={10} 
           minZoom={1.8} 
           fadeAnimation={true}>
               <TileLayer
                url ='https://api.mapbox.com/styles/v1/sayan--07/ckfjahy8p4wfz1armqoq2y8x4/tiles/256/{z}/{x}/{y}@2x?access_token= pk.eyJ1Ijoic2F5YW4tLTA3IiwiYSI6ImNrZmpjNG5tMjEzZHUyeG52MzRsZTFnbHQifQ.SQPhdcpsQB-5_vvSUs_NCw'
                attribution ='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
               />
               {
                   AffectedArea.coordinates.map((each,id) =>{
                    return <Circle
                    key={id}
                    center={[each.lat,each.lng]}
                    fill={0.4}
                    color={caseColors['confirmed'].hex}
                    fillColor={caseColors['confirmed'].hex}
                    radius={Math.sqrt(AffectedArea.Status[id].confirmed) * caseColors.confirmed.multiplier}           
                    >
                        <Popup>
                            <div className="Pop-Info">
                                <h1>{AffectedArea.country[id]}</h1>
                                <h2>
                                    <GoPrimitiveDot style={{fill :caseColors.confirmed.hex}}/>
                                    Cases : 
                                    &nbsp;<span>{AffectedArea.Status[id].confirmed}</span>
                                </h2>
                                <h2>
                                    <GoPrimitiveDot style={{fill :caseColors.recovered.hex}}/>
                                    Recovered : 
                                    &nbsp;<span>{AffectedArea.Status[id].recovered}</span>
                                </h2>
                                <h2>
                                    <GoPrimitiveDot style={{fill: caseColors.deaths.hex}}/>
                                    Deaths : 
                                    &nbsp;<span>{AffectedArea.Status[id].deaths}</span>
                                </h2>
                            </div>
                        </Popup>
                    </Circle>
                })
                }
           </LeafletMap>
       </div>
    )
}

export default WorldMap