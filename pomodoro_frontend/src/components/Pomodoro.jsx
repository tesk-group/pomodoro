
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import axios from "../axios";


export function Pomodoro(props) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [pauseReason, setPauseReason] = useState("");
  const [taskType, setTaskType] = useState("pomodoro");
  const [pomodoroDuration, setDuration] = useState(1500);

  useEffect(() => {
    let interval = null;
  
    if (!isPaused) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            let nextMinutes = 0;
            let nextSeconds = 0;
            let nextTaskType = '';
  
            if (taskType === "pomodoro") {
              nextMinutes = 5;
              nextTaskType = "break";
            } else {
              nextMinutes = 25;
              nextTaskType = "pomodoro";
            }
  
            setSeconds(nextSeconds);
            setMinutes(nextMinutes);
            setDisplayMessage(!displayMessage);
            setTaskType(nextTaskType);
            if(taskType === "pomodoro") {
              alert("Countdown Complete");
            }
            setIsPaused(taskType === "break");
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
  
    return () => clearInterval(interval);
  }, [seconds, isPaused, taskType, displayMessage]);
  

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const handlePlayPauseClick = () => {
    console.log(props)
    if (!props.taskID) {
      alert("Please select a task from the sidebar before starting Pomodoro.");
      return;
    }
    console.log(props.taskID);
    if (!isPaused && minutes !== 0 && seconds !== 0) {
      setIsPaused(true);
      const reason = prompt("Why are you pausing the Pomodoro?");
      const intReason = { reason: reason };
      if (!isPaused) { 
        axios
          .put("/api/timers/interrupt", intReason)
          .then((response) => {
            console.log("Timer paused" + reason);
          })
          .catch(function (error) {
            console.log(error);
            let response = error.response.data;
            let errorMessage = response.errors;

            if (typeof errorMessage !== "string") {
              errorMessage = response.errors[Object.keys(response.errors)[0]];
            }

            alert(errorMessage);
          });
      }
      setPauseReason(reason);

      
    } else {
      setIsPaused(!isPaused);
      if (taskType == "pomodoro" && pomodoroDuration/60 == minutes) {
        const newTimer = { duration: pomodoroDuration, type: taskType, task_id: props.taskID };
        console.log(newTimer);
        axios
          .post("/api/timers", newTimer)
          .then((response) => {
            console.log("Timer Started");
          })
          .catch(function (error) {
            console.log(error);
            let response = error.response.data;
            let errorMessage = response.errors;

            if (typeof errorMessage !== "string") {
              errorMessage = response.errors[Object.keys(response.errors)[0]];
            }

            alert(errorMessage);
          });
      } else if (taskType == "pomodoro" && pomodoroDuration/60 != minutes) {

        axios
          .get("/api/timers")
          .then((response) => {
            console.log("BEFORE RESUME" + response.data);
          })
          .catch(function (error) {
            console.log(error);
            let response = error.response.data;
            let errorMessage = response.errors;

            if (typeof errorMessage !== "string") {
              errorMessage = response.errors[Object.keys(response.errors)[0]];
            }

            alert(errorMessage);
          });

        axios
          .put("/api/timers/resume")
          .then((response) => {
            console.log("Timer Resumed");
          })
          .catch(function (error) {
            console.log(error);
            let response = error.response.data;
            let errorMessage = response.errors;

            if (typeof errorMessage !== "string") {
              errorMessage = response.errors[Object.keys(response.errors)[0]];
            }

            alert(errorMessage);
          });

          axios
          .get("/api/timers")
          .then((response) => {
            console.log("AFTER RESUME" + response.data);
          })
          .catch(function (error) {
            console.log(error);
            let response = error.response.data;
            let errorMessage = response.errors;

            if (typeof errorMessage !== "string") {
              errorMessage = response.errors[Object.keys(response.errors)[0]];
            }

            alert(errorMessage);
          });
      }
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
    setTaskType("pomodoro");
    setDuration(1500);
  };

  const handle50Click = () => {
    setMinutes(50);
    setSeconds(0);
    setDisplayMessage(false);
    setIsPaused(true);
    setTaskType("pomodoro");
    setDuration(3000);
  };

  return (
    <div className="pomodoro">
      <div className={isPaused ? "timer_circle_pause": "timer_circle_play"}>
        <div className={isPaused ? "timer_play" : "timer_pause"} >
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
      </div>
      <div className="timer_buttons">
          <button className={minutes === 25 ? "active" : ""} onClick={() => handle25Click()}>25 min</button>
          <button className={minutes === 50 ? "active" : ""} onClick={() => handle50Click()}>50 min</button>
      </div>
    </div>
  );
}

