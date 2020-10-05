import React from "react";
import CasesInfo from "./components/AppComponents/CasesInfo/CaseInfoHeader/CasesInfo.component";
import MainDataheader from "./components/AppComponents/Main data/header/MainDataheader.component";
import Trackers from "./components/AppComponents/Main data/Trackers/Trackers.component";
import "./index.css";
import './sass/App.scss'
import NewDataContext from './components/Context/NewDataContext'
import Table from "./components/AppComponents/CasesInfo/Table/Table.component";
import Charts from "./components/AppComponents/CasesInfo/Charts/Charts";
import Maps from "./components/AppComponents/Main data/Map/Map";
import Navbar from "./components/AppComponents/Navbar/Navbar.component";
const App = () =>{
    return (
         <NewDataContext>
           <div className="App">
           <div className="App-nav">
              <Navbar />
           </div>
           <div className="App-maindata">
              <MainDataheader />
              <Trackers />
              <Maps />
           </div>
            <div className="App-tracks">
              <CasesInfo />
              <Table />
              <Charts />
           </div>
         </div>
         </NewDataContext>
    );
}

export default App;
