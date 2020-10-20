import React from 'react'
import './Button.scss'
import { motion } from 'framer-motion'
const Button = ({children,className,element,...otherProps}) => {
    return (
        <motion.button
        {...otherProps}
        whileTap={{ scale : 0.9 }}
        className={`button ${className}`}>
            {children}
        </motion.button>
    )
}

export default Button
