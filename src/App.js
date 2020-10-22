import React, { Suspense } from "react";
import "./index.css";
import './sass/App.scss'
import { AnimatePresence } from 'framer-motion'
import NewDataContext from './components/Context/NewDataContext'
import { useWindowResize } from "./components/commonUI/customHooks/customHooks";
import { FIRSTBREAK_POINT,TENTHBREAK_POINT } from "./components/commonUI/Ui/breakpoints";
import Navbar from "./components/AppComponents/Navbar/Navbar.component"
import Spinner from './components/commonUI/Loader/Spinner'
import MainDataHeader from "./components/AppComponents/Main data/header/MainDataheader.component"
import PortalBtn from './components/AppComponents/PortalBtn/PortalBtn.component'
const Trackers = React.lazy(_ => import("./components/AppComponents/Main data/Trackers/Trackers.component"))
const Maps = React.lazy(_ => import("./components/AppComponents/Main data/Map/Map"))
const CasesInfo = React.lazy(_ => import("./components/AppComponents/CasesInfo/CaseInfoHeader/CasesInfo.component"))
const Table = React.lazy(_ => import("./components/AppComponents/CasesInfo/Table/Table.component"))
const Charts = React.lazy(_ => import("./components/AppComponents/CasesInfo/Charts/Charts"))
const App = () =>{
   const [width] = useWindowResize()
   const [scrollBtn,setScroll] = React.useState(false);
   const [scrollDirection,setDirection] = React.useState(0) 
   const mapRef = React.useRef(null);
   const chartRef = React.useRef(null);
   const scrollTrue = _ => {
      setScroll(true)
   }
   React.useEffect(() => {
      window.addEventListener('scroll',_ => {
         console.log(window.scrollY)
         if(scrollBtn && window.scrollY > 920){
            setDirection(1)
         }
         else if(scrollBtn && window.scrollY < 232){
            setDirection(0)
         }
      })
   },[scrollBtn])
   const handleScrollDown = _ => {
      const scrollIntoV = (ele,type) => ele.current.scrollIntoView({behavior: 'smooth',block : type});
      if(scrollDirection === 0){
         scrollIntoV(chartRef)
         setDirection(1)
      }
      else if(scrollDirection === 1){
         scrollIntoV(mapRef,'center')
         setDirection(2)
      }
      else if(scrollDirection === 2){
         setDirection(1)
         scrollIntoV(chartRef)
      }
   }
    console.log('App render!!')
    return (
    <>
     <NewDataContext>
           <div className="App">
           { width > FIRSTBREAK_POINT ? <div className="App-nav">
              <Navbar />
           </div> : null}
           {width < TENTHBREAK_POINT && scrollBtn && <AnimatePresence>
            <PortalBtn 
               onClick={handleScrollDown} 
               ifProps={scrollDirection}/>
           </AnimatePresence>}
           <div className="App-maindata">
              <MainDataHeader />
              <Suspense fallback={<Spinner col="#f6c879"/>}>
                  <Trackers />
              </Suspense>
               <Suspense fallback={<Spinner col="#f6c879"/>}>
                  <Maps ref={mapRef}/>
               </Suspense>
           </div>
            <div className="App-tracks">
               <Suspense fallback={<Spinner col="#f6c879"/>}>
                  <CasesInfo />
                     <Table Click={scrollTrue}/>
                     <Charts ref={chartRef}/>
               </Suspense>
           </div>
         </div>
         </NewDataContext>
    </>
    );
}

export default App;
