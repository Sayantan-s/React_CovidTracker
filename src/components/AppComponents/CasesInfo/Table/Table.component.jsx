import React from 'react'
import { useWindowResize } from '../../../commonUI/customHooks/customHooks'
import { DataContext } from '../../../Context/NewDataContext'
import './Table.scss'
import Tablerow from './TableRow/Tablerow.component'
import { SECONDBREAK_POINT } from '../../../commonUI/Ui/breakpoints'
const Table = () => {
    const[search,setSearch] = React.useState('');
    const [width] = useWindowResize()
    const[dataType,setType] = React.useState({
        active : true,
        recov : false,
        death : false
    })
    const { Data,setCos,setZoom,setCountry,setColor,setNum,setCn,setID } = React.useContext(DataContext)
    const Buttons = [
        {
            name : 'Active'
        },
        {
            name : 'Recovered'
        },
        {
            name : 'Deaths'
        }

    ]
    const InstantData = Data.filter(country => {
        return country.country.toLowerCase().includes(search.toLowerCase())
    })
    const onCountryChange = (lat,long,country,cn,id) => {
       setCos(lat,long)
       setZoom(6)
       setCountry(country)
       setCn(cn)
       setID(id)
    }
    const ActiveHandler = () => {
        setType({
            active : true,
            recov : false,
            death: false
        })
        setColor('#f6c879')
        setNum(0)
    }
    const RecovHandler = () => {
        setType({
            active : false,
            recov:true,
            death: false
        })
        setColor('#5cc1ac')
        setNum(1)
    }
    const DeathHandler = () => {
        setType({
            active : false,
            recov:false,
            death: true
        })
        setColor('#4f4e53')
        setNum(2)
    }
    return (
          <div className="table">
            {width <= SECONDBREAK_POINT ? <h1>
                Cases Info
            </h1> : null}
            <div className="table-search">
                <input
                type="search"
                value={search}
                placeholder="Search"
                onChange={(event) => {setSearch(event.target.value)}}
                />
            </div>
            <div className="table-buttons">
                {
                    Buttons.map(btn => {
                        return <button 
                        style={{background:  dataType.active && btn.name === "Active"? '#f6c879'
                        : dataType.recov && btn.name === "Recovered" ? '#5cc1ac' 
                        : dataType.death && btn.name === "Deaths" ? "#4f4e53"
                        : "linear-gradient(185deg, #2b2e31, #242729)",
                        boxShadow : dataType.active && btn.name === "Active"? `0px 5px 20px rgba(246, 200, 121,0.3)`
                        : dataType.recov && btn.name === "Recovered" ? `0px 5px 20px rgba(92, 193, 172,0.3)` 
                        : dataType.death && btn.name === "Deaths" ? `0px 5px 20px rgba(79, 78, 83,0.3)` : "0px 5px 15px rgba(0,0,0,0.1)"}}
                        key={btn.name}
                        onClick={ _ => {
                            btn.name === 'Active' ? ActiveHandler()
                            :btn.name === 'Recovered' ? RecovHandler()
                            :DeathHandler()
                        }}
                        className={'button'}
                        >{btn.name}</button>
                    })
                }
            </div>
            <div className="table-data">
                {
                    InstantData.map((country,id) => {
                        return <Tablerow
                        click={_ => onCountryChange(country.lat,country.long,country.iso,country.country,id)}
                        key={country.country}
                        country={country.country}
                        number={
                            dataType.active ? country.active 
                            : dataType.recov ? country.recovered 
                            : country.deaths}
                        newnumber={
                            dataType.active ? country.newCases
                            : dataType.recov ? country.newRecovered
                            : country.newDeaths}
                        img={country.flag}
                        />
                    })
                }
            </div>
          </div>
    )
}

export default Table
