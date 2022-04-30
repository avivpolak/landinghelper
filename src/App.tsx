import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface NewFlightData {
  heading: any;
  speed: any;
}

function App() {
  const getDiractrionAndSpeed=()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(addPosition);
      } else {
        return undefined 
    }
  }
  const [fligthData,setFligthData]= useState([] as NewFlightData[]);
  setInterval(getDiractrionAndSpeed,1000) 
  const addPosition = (position:any)=>{
    const newFlightData = [...fligthData, {heading :position.coords.heading , speed :position.coords.speed,latitude : position.coords.latitude, longitude : position.coords.longitude, accuracy : position.coords.accuracy}]
    setFligthData(newFlightData)
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <table>
          <thead>
            <tr>
              <th>Heading</th>
              <th>Speed</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {fligthData.map((flightData:any,index:number)=>{
              return(
                <tr key={index}>
                  <td>{flightData.heading}</td>
                  <td>{flightData.speed}</td>
                  <td>{flightData.latitude}</td>
                  <td>{flightData.longitude}</td>
                  <td>{flightData.accuracy}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        
   
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
