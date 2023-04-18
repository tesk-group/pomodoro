import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Pomodoro Over</div>;
  }

  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
      <div className="text">seconds left in Pomodoro </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={100}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: false, delay: 1 })}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>
  )
}

export default App;
