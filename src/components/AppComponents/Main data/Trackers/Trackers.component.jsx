import React, { useReducer } from 'react'
import { GlobeInfo } from '../../../../axios'
import { useWindowResize } from '../../../commonUI/customHooks/customHooks'
import { Active, Countries, Deaths, Infected, Recovered } from '../../../commonUI/Ui/UI'
import Tracker from './tracker/tracker.component'
import 'swiper/swiper.scss';
import './Trackers.scss'
import {Swiper,SwiperSlide} from 'swiper/react'
import { FIRSTBREAK_POINT } from '../../../commonUI/Ui/breakpoints'
const initialState = {
    loading :true,
    error :false,
    data : []
}
const actions = {
    FETCH_SUCCESS : 'FETCH_SUCCESS',
    FETCH_ERROR : 'FETCH_ERROR'
}
const reducer = (state,action) => {
    switch(action.type){
        case actions.FETCH_SUCCESS : 
        return{
            loading :false,
            error : null,
            data : action.payload
        }
        case actions.FETCH_ERROR : 
        return{
            loading : false,
            error : action.error,
            data : []
        }
        default : return state
    } 
}
const Trackers = () => {
    const [globalState,dispatch] = useReducer(reducer,initialState);
    const [width] = useWindowResize();
    React.useEffect(() => {
        GlobeInfo.get(`/all`)
        .then(resp => {
            if(resp.status === 200){
                dispatch({
                    type : actions.FETCH_SUCCESS,
                    payload : resp.data
                })
            }
        })
        .catch(err => {
            dispatch({
                type : actions.FETCH_ERROR,
                error : err
            })
        })
    },[])
    const { active,
            cases,
            todayCases,
            deaths,
            todayDeaths,
            recovered,
            todayRecovered,
            affectedCountries } = globalState.data;
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
    const BreakpointSwipper= (
        <Swiper 
        slidesPerView = {2}
        spaceBetween = {30}
        grabCursor={true}
        className="Swipper"
        breakpoints={{
            640 : {
                slidesPerView : 1,
                spaceBetween : 40,
                width: 640
            }
        }}
        >
            {
               newData.map(({key,GlobalData}) => (
                <SwiperSlide key={key}
                className='Swipper-Slide' 
                >
                         <Tracker
                            bgCol={GlobalData.color}
                            Svg={GlobalData.icon}
                            number={GlobalData.number}
                            incre={GlobalData.rise}
                            title={key}
                            format={GlobalData.format}
                            />
                </SwiperSlide>
            ))
            }
        </Swiper>
    )
    const BigScreen = (
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
        <div className="Tracker-container">
           {
               width <= FIRSTBREAK_POINT ? BreakpointSwipper : BigScreen 
           }
        </div>
    )
}

export default Trackers
