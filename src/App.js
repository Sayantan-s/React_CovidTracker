import React, { Component } from "react";
import "./index.css";
import './App.scss'
import Header from "./components/Header/Header";
import GlobalData from "./components/Global/GlobalData";
import Tables from "./components/Tables&Maps/Tables";
import Precaution from "./components/Precautions/Precaution";
import Footbar from "./components/Footer/Footbar";

class App extends Component {
  render() {
    return (
      <div className="App-container">
        <div className="App">
          <Header />
          <GlobalData />
          <Tables />
          <Precaution />
          <Footbar />
        </div>
      </div>
    );
  }
}

export default App;
