import React from 'react'
import './Rates.scss'
const Rates = ({type,rate,bgCol}) => {
    return (
        <h4 className="Rates">
            <span style={{backgroundColor : bgCol}}/>
            <span>
                {type}
            </span>
            <span >
                {rate}%
            </span>
        </h4>
    )
}

export default Rates
