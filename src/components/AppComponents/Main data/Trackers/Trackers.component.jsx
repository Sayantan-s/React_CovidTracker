import React from 'react'
import { GlobeV3URL } from '../../../../axios'
import { useAxFetch, useWindowResize } from '../../../commonUI/customHooks/customHooks'
import { Active, Countries, Deaths, Infected, Recovered } from '../../../commonUI/Ui/UI'
import Tracker from './tracker/tracker.component'
import './Trackers.scss'
import { EIGHTHBREAK_POINT,TENTHBREAK_POINT,SWIPER_BREAK,SWIPER_BREAK2,SWIPER_BREAK3,SWIPER_BREAK4,SWIPER_BREAK5,SWIPER_BREAK6 } from '../../../commonUI/Ui/breakpoints'
import { motion } from 'framer-motion'
const Trackers = () => {
    const { resp } = useAxFetch(GlobeV3URL,'/all')
    const [ width ] = useWindowResize();
    const { active,
            cases,
            todayCases,
            deaths,
            todayDeaths,
            recovered,
            todayRecovered,
            affectedCountries } = resp;
    let newData = [];
    const Api = {
        Infected : {
            number : cases,
            rise : todayCases + todayRecovered,
            icon : Infected,
            color : '186, 49, 49',
            format : true
        },
        Active : {
            number: active,
            rise : todayCases,
            icon: Active,
            color : '246, 200, 121',
            format : true
        },
        Deaths : {
            number : deaths,
            rise : todayDeaths,
            icon : Deaths,
            color : '79, 78, 83',
            format : true
        },
        Recovered : {
            number : recovered,
            rise : todayRecovered,
            icon : Recovered,
            color : '92, 193, 172',
            format : true
        },
        Countries : {
            number : affectedCountries,
            icon : Countries,
            color : '140, 121, 246',
            format : false
        }
    }
    for(let [key] of Object.entries(Api))
    {
        newData.push({
            key : key,
            GlobalData : Api[key]
        })
    }
    const AnimationVariants = {
        start: {
          scale : 1
        },
          end: {
            scale : 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
          },
    }
    const Screen = (
        newData.map(({key,GlobalData}) => (
            <Tracker 
            key={key}
            bgCol={GlobalData.color}
            Svg={GlobalData.icon}
            number={GlobalData.number}
            incre={GlobalData.rise}
            title={key}
            format={GlobalData.format}
            />
        ))
    )
    return (
       <>
        {
            active &&   
            <motion.div
            variants={AnimationVariants}
            initial = 'start'
            animate="end"
            drag={'x'} 
            dragConstraints={{left : width < SWIPER_BREAK6 ? -600 : width > SWIPER_BREAK6 && width < SWIPER_BREAK5 ? -570: width > SWIPER_BREAK5 && width < SWIPER_BREAK4 ? -480 : width > SWIPER_BREAK4 && width < SWIPER_BREAK3 ? -400 : width > SWIPER_BREAK3 && width < SWIPER_BREAK2 ? -320 : width > SWIPER_BREAK2 && width < SWIPER_BREAK ? -260 :width > SWIPER_BREAK && width < TENTHBREAK_POINT ? -200 : width > TENTHBREAK_POINT && width < EIGHTHBREAK_POINT ? -130 : 0,right: 0}}
            dragElastic={0.05}
            dragTransition={{ bounceStiffness: 500, bounceDamping: 10 }}
            className="Tracker-container">
              { Screen }
            </motion.div> 
        }
       </>
    )
}

export default Trackers
