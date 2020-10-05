import React from 'react'
import { Active } from '../../commonUI/Ui/UI'
import './Navbar.scss'
const Navbar = () => {
    return (
        <div className="Navbar">
            <div className="Navbar-svg">
                <Active />
            </div>
        </div>
    )
}

export default Navbar
