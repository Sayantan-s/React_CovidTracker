import React from 'react'
import { useWindowResize } from '../../../commonUI/customHooks/customHooks'
import { SECONDBREAK_POINT } from '../../../commonUI/Ui/breakpoints'
import './CasesInfo.scss'
const CasesInfo = () => { 
    const [width] = useWindowResize()
    if (width >= SECONDBREAK_POINT){
        return (
            <div className="CasesInfo">
                <h1>
                    Cases Info
                </h1>
            </div>
        )
    }
    else return null
}

export default CasesInfo
