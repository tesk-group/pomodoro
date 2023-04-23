import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { LogIn } from "./containers/LogIn";
import { Register } from "./containers/Register";
import { useState } from 'react';

function App() {

  // const renderTime = ({ remainingTime }) => {
  //   if (remainingTime === 0) {
  //     return <div className="timer">Pomodoro Over</div>;
  //   }
  
  //   return (
  //     <div className="timer">
  //       <div className="value">{remainingTime}</div>
  //       <div className="text">seconds left in Pomodoro </div>
  //     </div>
  //   );
  // };

  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <LogIn onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} /> 
      }
      {/* <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={100}
          colors={["#699277"]}
          colorsTime={[10]}
          trailColor={"#CEE5D0"}
          strokeLinecap={"butt"}
          onComplete={() => ({ shouldRepeat: false, delay: 1 })}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div> */}
    </div>
  )
}

export default App;
