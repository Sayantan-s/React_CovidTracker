import { Circle,Popup} from 'react-leaflet'
import { Map as LeafletMap,TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import React from 'react'
import './Map.scss'
import { CRS } from 'leaflet'
import { DataContext } from '../../../Context/NewDataContext'
import { motion } from 'framer-motion'

const Maps = () => {
	
	const { latitude,longitude,Data,zoom } = React.useContext(DataContext)
    return (
		<motion.div 
		initial = {{ opacity : 0 }}
		animate = {{ opacity : 1 }}
		transition = {{ duration : 0.8,delay : 0.2 }}
		className="Maps">
			<LeafletMap
			zoomControl={false}
			center={[latitude,longitude]}
			zoom={zoom}
			attributionControl={false}
			crs={CRS.EPSG3395}
			maxZoom={10} 
			minZoom={3}
			>
				<TileLayer
				className="Layer"
				url="https://api.mapbox.com/styles/v1/sayan--07/ckfjregij0yei19o3xxk6izi1/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2F5YW4tLTA3IiwiYSI6ImNrZmpydXk0bDBsN3cydG40a251YXk0dTMifQ.9r_0XUkK42FqkJO0sRxCKg"
				attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
				/>
				{
					Data.map(cn => (
						<Circle
						key={cn.country}
						center={[cn.lat,cn.long]}
						fillOpacity={0.5}
						color={"#EA5455"}
						stroke={false}
						radius={cn.cases > 0 && cn.cases < 10000? Math.sqrt(cn.cases)*1000 : cn.cases > 10000 && cn.cases < 100000? cn.cases/2 : cn.cases > 100000 && cn.cases < 1000000? cn.cases/3 : cn.cases > 1000000 && cn.cases < 10000000 ? cn.cases/7 : cn.cases/10}
						fillColor={"#EA5455"}>
							<Popup>
								<div className="leaflet-popup-content--img">
									<img src={cn.flag} alt={cn.country}/>
								</div>
								<div className="leaflet-popup-content--infected leaflet-popup-content--rate">
									<span>Infected</span>
									<span>{cn.cases}</span>
								</div>
								<div className="leaflet-popup-content--recovered leaflet-popup-content--rate">
									<span>Active</span>
									<span>{cn.active}</span>
								</div>
								<div className="leaflet-popup-content--deaths leaflet-popup-content--rate">
									<span>Deaths</span>
									<span>{cn.deaths}</span>
								</div>
								<div className="leaflet-popup-content--recovered leaflet-popup-content--rate">
									<span>Recovered</span>
									<span>{cn.recovered}</span>
								</div>
							</Popup>
						</Circle>
					))
				}
			</LeafletMap>
        </motion.div>
    )
}

export default Maps
