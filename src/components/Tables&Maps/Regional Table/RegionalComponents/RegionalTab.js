import React from 'react'
import { MDBDataTable } from 'mdbreact';

const RegionalTab = ({CountryData}) => {
    const data = {
        columns: [
          {
            label: 'Province',
            field: 'prov',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Total',
            field: 'total',
            sort: 'asc',
            width: 270
          },
          {
            label: 'Active',
            field: 'active',
            sort: 'asc',
            width: 200
          },
          {
            label: 'Recovered',
            field: 'recov',
            sort: 'asc',
            width: 200
          },
          {
            label: 'Deaths',
            field: 'death',
            sort: 'asc',
            width: 100
          },
        ],
        rows: CountryData.map(each =>
            {
                return{
                    prov : `${each.name}`,
                    total : `${each.today_confirmed}`,
                    active : `${each.today_open_cases}`,
                    recov : `${each.today_recovered}`,
                    death : `${each.today_deaths}`
                }
            })
      };
    return (
        <div>
            <MDBDataTable 
             borderless
             small
             maxHeight="330px"
             entries={5}
             displayEntries={false}
             materialSearch={true}
             data={data}/>
        </div>
    )
}

export default RegionalTab
