import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../../commonUI/Ui/Button/Button.component.jsx'
import './Portal.scss'
import  { Arrow } from '../../commonUI/Ui/UI'
import { HELPINGBRK_2 } from '../../commonUI/Ui/breakpoints'
import { useWindowResize } from '../../commonUI/customHooks/customHooks'
const PortalBtn = ({onClick,ifProps}) => {
    const Animation = {
        from : {
            x : 500,
        },
        to : {
            x : 0,
            transition : {
                type : 'spring',
                stiffness : 200,
                damping: 20,
            }
        }
    }
    const [ width ] = useWindowResize()
    return ReactDOM.createPortal(
        <Button
        style={{rotate : ifProps === 1 ? 180 : 0}}
        onClick={onClick}
        variants={Animation}
        initial="from"
        animate="to" 
        className = "portal-btn">
            <Arrow size={width < HELPINGBRK_2 ? "3.3rem" : "3.5rem"}/>
        </Button>,
        document.getElementById('scroll-btn-root')
    )
}

export default PortalBtn
