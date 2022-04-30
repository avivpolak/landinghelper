import { useRef, useState } from "react";
import "./App.css";

interface NewFlightData {
    heading: any;
    speed: any;
}


function App() {  
    const [averageFligthDataArchive, setAverageFligthDataArchive] = useState({} as any);
    const [fligthDataArray, setFligthDataArray] = useState(
        [] as NewFlightData[]
    );
    const canvasRef = useRef(null);

    //get position
    const getDiractrionAndSpeed = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(addPosition);
        } else {
            return undefined;
        }
    };

    //taking a sample of the position
    const takeASample = async () => {
        getDiractrionAndSpeed();
    };

    //drows point
    const drawPoint = (context: any, x: any, y: any, color: any, size: any) => {
        if (color == null) {
            color = "#000";
        }
        if (size == null) {
            size = 5;
        }

        const radius = 0.5 * size;
        const pointX = Math.round(x - radius);
        const pointY = Math.round(y - radius);

        context.beginPath();
        context.fillStyle = color;
        context.fillRect(pointX, pointY, size, size);
        context.fill();
    };
    //isExistInFligthDataArray
    const isExistInFligthDataArray = (
        fligthDataArray: NewFlightData[],
        position: any
    ) => {
        const { heading, speed } = position.coords;
        const isExist = fligthDataArray.some(
            (item: NewFlightData) =>
                item.heading === heading && item.speed === speed
        );
        return isExist;
    };
    //adding position to the sum of heading and speed
    const addPosition = (position: any) => {
        if (position.coords.heading && position.coords.speed && !isExistInFligthDataArray(fligthDataArray,position)) {
            setFligthDataArray([
                ...fligthDataArray,
                {
                    heading: position.coords.heading,
                    speed: position.coords.speed,
                },
            ]);
        }
    };
    //calculating the average heading and speed
    const calculateAverage = () => {
      //split the data info fiths
        const flooredHeadings = fligthDataArray.map((item: NewFlightData) => {
          item.heading = Math.floor(item.heading / 5) * 5;
          return item;
        });
        const splitedFligthDataArray:any = {};
        flooredHeadings.forEach((item: NewFlightData) => {
          if (!splitedFligthDataArray[item.heading]) {
            splitedFligthDataArray[item.heading] = [];
          }
          splitedFligthDataArray[item.heading].push(item.speed);
        })

      //get the most significent fith
      const mostSignificantFith = Object.keys(splitedFligthDataArray).reduce((a: any, b: any) => {
        return splitedFligthDataArray[a].length > splitedFligthDataArray[b].length ? a : b;});


      //clean the data that is not in the most significent fith
      const relevantFith = splitedFligthDataArray[mostSignificantFith];

      //calculate the average speed 
      const averageSpeed = relevantFith.reduce((a: any, b: any) => a + b, 0) / relevantFith.length;

      //add the average speed to the matching fith 
      const newAverageFligthDataArchive:any = Object.assign({}, averageFligthDataArchive);
      newAverageFligthDataArchive[mostSignificantFith] = averageSpeed;
      setAverageFligthDataArchive(newAverageFligthDataArchive)

      //clear the canvas
      const canvas: any = canvasRef.current;
      if (!(canvas instanceof HTMLCanvasElement)) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    

      //draw the archive data 
      for(const key in averageFligthDataArchive){
        console.log(averageFligthDataArchive[key])
        drawPoint(ctx, 250, 250, "black", 2);
        const heading = (parseInt(key) * Math.PI) / 180;
        const centerX = 250;
        const centerY = 250;
        const spreading = 15;
        const X = Math.sin(heading) * averageFligthDataArchive[key] * spreading + centerX;
        const Y = -Math.cos(heading) * averageFligthDataArchive[key] * spreading + centerY;
        drawPoint(ctx, X, Y, "red", 2);
      }

      //reset the fligth data array
      setFligthDataArray([]);
    };

    const resetFligthDataArray = () => {
      setFligthDataArray([]);
    }

    const calculateWindDiraction = () =>{
      //get 
    }



    return (
        <div className="App">
            <div
                style={{
                    position: "absolute",
                    top: "60%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
            
                   <h1>
                    <table style={{
                        border: "1px solid black",
                        borderCollapse: "collapse",
                        width: "100%",
                        borderColor: "green",

                    }}>
                        <thead>
                        <tr>
                            <th>heading</th>
                            <th>speed</th>
                        </tr>
                        </thead>
                        <tbody>
                        {fligthDataArray.map((data: any, index: any) => {
                            return (
                                <tr>
                                    <td>{data.heading.toFixed(2)}</td>
                                    <td>{data.speed.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </h1>
                <button onClick={takeASample}>take a sample</button>
                <button onClick={calculateAverage}>
                    calculate avarage and drow a dot
                </button>
                <button onClick={resetFligthDataArray}>
reset period without calculate                </button>
                <canvas
                    ref={canvasRef}
                    width="500"
                    height="500"
                    style={{ border: "1px solid black" }}
                ></canvas>
            </div>
        </div>
    );
}

export default App;
