import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface NewFlightData {
  heading: any;
  speed: any;
}
function drawPoint(context:any, x:any, y:any, color:any, size:any) {
  if (color == null) {
    color = '#000';
  }
  if (size == null) {
      size = 5;
  }

  var radius = 0.5 * size;

  // to increase smoothing for numbers with decimal part
var pointX = Math.round(x - radius);
  var pointY = Math.round(y - radius);

  context.beginPath();
  context.fillStyle = color;
  context.fillRect(pointX, pointY, size, size);
  context.fill();


}
function App() {
  const getDiractrionAndSpeed=()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(addPosition);
      } else {
        return undefined 
    }
  }
  const canvasRef = useRef(null);
const draw = (position:any)=> {
  const canvas:any = canvasRef.current
  if (!(canvas instanceof HTMLCanvasElement)) return
  const ctx = canvas.getContext('2d');
  if(!ctx) return
  drawPoint(ctx, 250+ Math.sin(position.coords.heading)*position.coords.speed, 250+Math.cos(position.coords.heading)*position.coords.speed, 'red', 5);
}

  const [fligthData,setFligthData]= useState([] as NewFlightData[]);
  setInterval(getDiractrionAndSpeed,1000) 
  const addPosition = (position:any)=>{
    //const newFlightData = [...fligthData, {heading :position.coords.heading , speed :position.coords.speed,latitude : position.coords.latitude, longitude : position.coords.longitude, accuracy : position.coords.accuracy}]
    //setFligthData(newFlightData)
    
    draw(position)
      }  
  return (
    <div className="App">
{/* this div is in the center of the screen */}
      <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
        <canvas ref={canvasRef} width="500" height="500" style={{border: '1px solid black'}}></canvas>
      </div>
       
    </div>
  );
}

export default App;
