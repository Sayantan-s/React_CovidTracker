import React from 'react'
import './Tablerow.scss'
import { motion } from 'framer-motion'
const Tablerow = ({img,number,newnumber,country,click}) => {
    const Animation = {
        start : {
            x : 1000,
            opacity : 0
        },
        end : {
            x : 0,
            opacity : 1,
        },
    }
    return (
        <motion.div 
        variants = {Animation}
        className="table-row" onClick={click}>
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
        </motion.div>
    )
}

export default Tablerow
