import React from 'react'
import ReactDOM from 'react-dom'
import './Backdrop.scss'
import { SwitchContext } from '../../Context/ModalSwitch'
const Backdrop = () => {
    const 
    { SeeBgdrop,
        Togglerev,
        Toggleins,
        Togglehelpl,
        helpLine,
        instruct,
        review } = React.useContext(SwitchContext)
    const Togglers = {
        HelpLine : {
            Toggler : Togglehelpl,
            btn : helpLine
        },
        Instruction : {
            Toggler : Toggleins,
            btn : instruct
        },
        Review : {
            Toggler : Togglerev,
            btn : review
        }
    }
    const ToggArr = [];
    for(let i in Togglers)
    {
         ToggArr.push({
             Type : i,
             mainData : Togglers[i]
         })
    }
    const ShowBackdrop = ToggArr.map((each,id) =>
    {
        return SeeBgdrop && each.mainData.btn ?  
        <div
        key={id} 
        className="Backdrop" 
        onClick={each.mainData.Toggler} 
        style={{backgroundColor : "rgba(192, 192, 192, 0.549)"}}
        /> : null
    })
    return ReactDOM.createPortal(
        ShowBackdrop,
        document.getElementById('modal-root')
    )
}

export default Backdrop
