import React from 'react'
import { useWindowResize } from '../../../commonUI/customHooks/customHooks'
import { FIRSTBREAK_POINT } from '../../../commonUI/Ui/breakpoints'
import { Active } from '../../../commonUI/Ui/UI'
import './MainDataheader.scss'
const MainDataheader = () => {
    const [width] = useWindowResize()
    const Logo = (
        <span className="Svg-span">
            <Active />
        </span>
    )
    return (
        <div className="Main-data">
            <h1>
                <span>Coronavirus {" "}</span>
                <span className="Svg">
                    covid-19 { width < FIRSTBREAK_POINT ? Logo : null}
                </span>
            </h1>
            <h2>Global Cases</h2>
        </div>
    )
}

export default MainDataheader

