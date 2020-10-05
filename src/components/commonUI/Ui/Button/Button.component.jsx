import React from 'react'
import './Button.scss'
const Button = ({children,className}) => {
    return (
        <button className={`button ${className}`}>
            {children}
        </button>
    )
}

export default Button
