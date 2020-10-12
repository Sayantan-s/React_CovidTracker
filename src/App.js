import React, { Suspense } from "react";
import "./index.css";
import './sass/App.scss'
import NewDataContext from './components/Context/NewDataContext'
import { useWindowResize } from "./components/commonUI/customHooks/customHooks";
import { FIRSTBREAK_POINT } from "./components/commonUI/Ui/breakpoints";
import Navbar from "./components/AppComponents/Navbar/Navbar.component"
import Spinner from './components/commonUI/Loader/Spinner'
import MainDataHeader from "./components/AppComponents/Main data/header/MainDataheader.component"
const Trackers = React.lazy(_ => import("./components/AppComponents/Main data/Trackers/Trackers.component"))
const Maps = React.lazy(_ => import("./components/AppComponents/Main data/Map/Map"))
const CasesInfo = React.lazy(_ => import("./components/AppComponents/CasesInfo/CaseInfoHeader/CasesInfo.component"))
const Table = React.lazy(_ => import("./components/AppComponents/CasesInfo/Table/Table.component"))
const Charts = React.lazy(_ => import("./components/AppComponents/CasesInfo/Charts/Charts"))
const App = () =>{
   const [width] = useWindowResize()
   console.log(width)
    return (
         <NewDataContext>
           <div className="App">
           { width > FIRSTBREAK_POINT ? <div className="App-nav">
              <Navbar />
           </div> : null}
           <div className="App-maindata">
              <MainDataHeader />
              <Suspense fallback={<Spinner col="#f6c879"/>}>
                  <Trackers />
              </Suspense>
               <Suspense fallback={<Spinner col="#f6c879"/>}>
                  <Maps />
               </Suspense>
           </div>
            <div className="App-tracks">
               <Suspense fallback={<Spinner col="#f6c879"/>}>
                  <CasesInfo />
                  <Table />
                  <Charts />
               </Suspense>
           </div>
         </div>
         </NewDataContext>
    );
}

export default App;
