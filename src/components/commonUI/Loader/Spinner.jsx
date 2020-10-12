import React from 'react'
import './Spinner.scss'
const Spinner = ({col}) => {
    return (
      <div className="Spinner">
        <div className="nb-spinner" style={{
          borderTopColor : `${col}`
        }}></div>
      </div>
    )
}

export default Spinner
