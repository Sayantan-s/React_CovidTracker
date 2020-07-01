import React, { useState, useEffect } from 'react'
import { covidURL } from '../../axios'
import styled from 'styled-components'
import { MDBDataTableV5, MDBBtn } from 'mdbreact'
import Regional from './Regional Table/Regional'

const Tables = () => {
    const [CountryData,setCdata] = useState([])
    const [Name,setName] = useState(null)
    const Namegetter = (n) =>
    {
      setName(n);
      console.log(n);
    }
    const date =`${new Date().getFullYear()}-${"0" + (new Date().getMonth() + 1)}-${new Date().getUTCDate()}`
    useEffect(() =>
    {
        covidURL.get(`/${date}`)
        .then(resp =>
            {
                setCdata(Object.values(resp.data.dates[`${date}`].countries))
            })
        .catch(err =>
            {
                console.log(err)
            })
    },[date])
    const dataTable ={
        columns: [
            {
              label: 'Country',
              field: 'country',
              width: 660,
              sort: 'desc',
              attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'Name',
              },
            },
            {
              label: 'Total Cases',
              field: 'total',
              width: 200,
            },
            {
              label: 'Active',
              field: 'active',
              width: 200,
            },
            {
              label: 'Recovered',
              field: 'recovered',
              sort: 'asc',
              width: 200,
            },
            {
              label: 'Deaths',
              field: 'deaths',
              sort: 'disabled',
              width: 100,
            },
            {
              label : 'Regional',
              field : 'reg',
              width : 50
            }
          ],
        rows : CountryData.map(each =>
          (
            {
            country : `${each.name}`,
              total : `${each.today_confirmed}`,
              active : `${each.today_open_cases}`,
              recovered : `${each.today_recovered}`,
              deaths : `${each.today_deaths}`,
              reg : each.regions.length === 0 ? "" :   <MDBBtn tag="a" size="sm" floating gradient="aqua" onClick={() => Namegetter(each.name)}>Go</MDBBtn>
            }
          ))
    }
    return (
       <TableConatiner>
           <MDBtableWrapper>
                <MDBDataTableV5 borderless materialSearch data={dataTable} entriesOptions={[5,10]}/>
           </MDBtableWrapper>
           <MapWrapper>
              <Regional CountryName={Name}/>
           </MapWrapper>
       </TableConatiner>
    )
}

export default Tables

const TableConatiner = styled.div`
display:flex;
flex-wrap:wrap;
flex-flow:row;
justify-content:space-between;
width:100%;
margin-bottom:20px;`
const MDBtableWrapper = styled.div`
flex:1.1;
background-color:whitesmoke;
margin-right:20px;
border-radius:0.5rem;
padding:20px;`
const MapWrapper = styled.div`
flex:1;
border-radius:0.5rem;`