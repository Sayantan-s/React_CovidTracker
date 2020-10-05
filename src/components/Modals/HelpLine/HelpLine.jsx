import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import './HelpLine.scss'
import  { FaCommentMedical } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { SwitchContext } from '../../Context/ModalSwitch'
const HelpLine = () => {
  const { Togglehelpl,helpLine } = useContext(SwitchContext)
  const HelpLinePost = helpLine ?   <div className="HelpLine">
  <IoMdClose className="HelpLine--close" onClick={Togglehelpl}/>
   <h3 className="h3">EMERGENCY NUMBERS - KOLKATA</h3>
   <HlpStruct 
   header=" CORONA ( COVID 19 ) HELPLINE"
   number=" 011-23978046 OR 1075"/>
   <HlpStruct 
   header=" KOLKATA COVID 19 HELPLINE "
   number="033-22143526 , 23412600"/>
    <HlpStruct 
   header=" COVID QUERY "
   number="1800313444222"/>
  </div> : null;
    return ReactDOM.createPortal(
        HelpLinePost,
        document.getElementById('modal-root')
    )
}
export default HelpLine
export const HlpStruct = (props) =>
{
  return(
    <div className="HelpLine-parts">
        <h4 className="h4"><FaCommentMedical className="HelpLine-parts--bullet"/>{props.header}</h4>
        <div>{props.number}</div>
    </div>
  )
}
