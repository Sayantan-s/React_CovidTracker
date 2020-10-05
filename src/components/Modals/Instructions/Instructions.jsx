import React from 'react'
import './Instructions.scss'
import { SwitchContext } from '../../Context/ModalSwitch'
import { AiFillRightCircle } from 'react-icons/ai'
import { IoMdClose  } from 'react-icons/io'
import ReactDOM from 'react-dom';
const Instructions = () => {
    const { instruct,Toggleins } = React.useContext(SwitchContext)
    const InsPost = instruct ?  <div className="Instructions">
        <IoMdClose className="Instructions--close" onClick={Toggleins}/>
        <h3 className="h3">Short instructions!</h3>
        <div>
            <h4 className="h4">CARDS</h4>
            <div>Hover on the card charts to get the marker.</div>
        </div>
        <div>
            <h4 className="h4">TABLE BUTTONS</h4>
            <div>Click on this '{<AiFillRightCircle style={{fontSize:"3rem"}}/>}' button to potray '30day data' and 'Recovery rate check%' and if the button is '{<AiFillRightCircle style={{fill : "#9452A5",fontSize:"3rem"}}/>}' ,then you get the regional data of that specific country too.</div>
        </div>
    </div> : null
    return ReactDOM.createPortal(
        InsPost,
        document.getElementById('modal-root')
    )
}

export default Instructions
