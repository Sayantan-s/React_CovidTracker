import React from 'react'
import styled from 'styled-components'
import { Logo } from '../Logo/Logocontext'
const Nav = styled.nav`
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:space-between;
font-weight:200;
font-size:35px;
margin-bottom:20px;
color:black;
.Logo{
    display : flex;
    flex-wrap : wrap;
    flex-direction : row;
    width : 190px;
    justify-content : space-between;
}`
const Dates = styled.span`
font-size:27px;
`
export const CurrentDate = () =>
{   const months= ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const days=["Sunday","Monday","Tuesday","Wedensday","Thursday","Friday","Saturday"]
    return(
    <div>
        <span>{days[new Date().getDay()]}, {new Date().getDate()}<sup>th</sup></span>
        <Dates>{months[new Date().getMonth()]} {new Date().getFullYear()}</Dates>
    </div>
    )
}
const Header = () => {
    return (
        <Nav>
            <div className="Logo">
                <Logo />
            </div>
            <div className="Date"><CurrentDate /></div>
        </Nav>
    )
}

export default Header
