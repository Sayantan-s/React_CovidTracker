import React from 'react'
import './tracker.scss'
const Tracker = ({Svg,title,number,incre,bgCol,format}) => {
    const Formatter = (number) => {
        const numberFomatter = number > 0 && number <100000 ? 
        `${(number/1000).toFixed(1)}K` : number > 100000 ? `${(number/1000000).toFixed(1)}M`: number ;
        return numberFomatter;
    }
    return (
        <div className="tracker">
            <div className="tracker-img" 
            style={{
                background : `rgb(${bgCol})`,
                boxShadow : `0px 5px 20px rgba(${bgCol},0.5)`
                }}>
                <Svg />
            </div>
            <div className="tracker-data">
                <h3>
                    {title}
                </h3>
                <h4>
                    {format ? Formatter(number) : number}
                </h4>
            </div>
            <div className="tracker-incre">
                <h3>
                    {format? `+${Formatter(incre)}` : incre}
                </h3>
            </div>
        </div>
    )
}

export default Tracker
