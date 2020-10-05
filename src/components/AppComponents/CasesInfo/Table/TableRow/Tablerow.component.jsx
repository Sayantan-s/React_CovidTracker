import React from 'react'
import './Tablerow.scss'
const Tablerow = ({img,number,newnumber,country,click}) => {
    return (
        <div className="table-row" onClick={click}>
            <div className="table-row--left">
                <div className="table-row--left_flag">
                    <img src={img} alt={country} width="40" height="40" />
                </div>
                <h2>{country}</h2>
                <h3>+{newnumber}</h3>
            </div>
            <div className="table-row--right">
                <h4>{number}</h4>
            </div>
        </div>
    )
}

export default Tablerow
