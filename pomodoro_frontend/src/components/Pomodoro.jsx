import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

export function Pomodoro(taskID) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [pauseReason, setPauseReason] = useState("");
  const [taskType, setTaskType] = useState("task");
  const [pomodoroDuration, setDuration] = useState(1500);

  useEffect(() => {
    let interval = null;

    if (!isPaused) {
      interval = setInterval(() => {
        clearInterval(interval);

        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            let minutes = displayMessage ? 50 : 5;
            let seconds = 0;

            setSeconds(seconds);
            setMinutes(minutes);
            setDisplayMessage(!displayMessage);
            if (minutes === 50) {
              setIsPaused(true);
            }
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);

      if (minutes === 0 && seconds === 0) {
        console.log("Countdown complete!");
        if (taskType === "task") {
          //API Call here
          setDuration(1500);
          const newTimer = { pomodoroDuration, taskType, taskID };
          setTaskType("break");
        } else {
          setTaskType("task");
        }
        setPauseReason("");
      }
    }

    return () => clearInterval(interval);
  }, [seconds, isPaused]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const handlePlayPauseClick = () => {
    console.log(taskID);
    if (!isPaused && minutes !== 0 && seconds !== 0) {
      setIsPaused(true);
      const reason = prompt("Why are you pausing the Pomodoro?");
      setPauseReason(reason);
    } else {
      setIsPaused(!isPaused);
      if (!isPaused) {
        setPauseReason("");
      }
    }
  };

  const handle25Click = () => {
    setMinutes(25);
    setSeconds(0);
    setDisplayMessage(false);
    setIsPaused(true);
    setTaskType("task");
    setDuration(1500);
  };

  const handle50Click = () => {
    setMinutes(50);
    setSeconds(0);
    setDisplayMessage(false);
    setIsPaused(true);
    setTaskType("task");
    setDuration(3000);
  };

  return (
    <div className="pomodoro">
      <div className={isPaused ? "timer_play" : "timer_pause"}>
      <div className="timer_time_total"> {pomodoroDuration/60} Minute Timer</div>
        <FontAwesomeIcon 
          icon={isPaused ? faPlay : faPause}
          className="play"
          onClick={handlePlayPauseClick}
          size="10x"
        />
        <div className="timer_time">
            {timerMinutes}:{timerSeconds} 
        </div>
      </div>
      <div className="timer_buttons">
          <button className={minutes === 25 ? "active" : ""} onClick={() => handle25Click()}>25 min</button>
          <button className={minutes === 50 ? "active" : ""} onClick={() => handle50Click()}>50 min</button>
      </div>
    </div>
  );
}