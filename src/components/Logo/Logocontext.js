import React from 'react'
import CaptLogo from '../../assets/Masker N95.svg'

export const Logocontext = React.createContext()

export const Logo = () =>
{
    return(
      <span style={{background:"linear-gradient(to right, #ee9ca7, #ffdde1)",padding:"0px 7px",borderRadius:20,fontSize:30}}><img src={CaptLogo} alt="Logo" height="40px" width="40px"/> CovLive</span>
    )
}