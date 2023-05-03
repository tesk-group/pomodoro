import { useState, useEffect } from "react";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [pauseReason, setPauseReason] = useState("");
  const [taskID, setID] = useState();
  const [taskType, setTaskType] = useState("task");
  const [pomodoroDuration, setDuration] = useState(240);

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
            let minutes = displayMessage ? 4 : 2;
            let seconds = 0;

            setSeconds(seconds);
            setMinutes(minutes);
            setDisplayMessage(!displayMessage);
            if (minutes == 4) {
              setIsPaused(true);
            }
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);

      if (minutes === 0 && seconds === 0) {
        console.log("Countdown complete!");
        if (taskType == "task") {
          //API Call here
          setDuration(240);
          const newTimer = {pomodoroDuration, taskType, taskID};
          try { fetch('/api/timers/', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept": "application/json", 'X-CSRF-TOKEN': "{{ csrf_token() }}", "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`},
            body: JSON.stringify(newTimer)
          }).then(response => response.json()).then(data => {
              console.log("happy happy happy");
          })}
          catch(error) {
              console.log(error);
          }
          setTaskType("break");
        } else {
          setTaskType("task");
        }
        setPauseReason({});
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
      const reason = prompt("Why are you pausing the countdown?");
      setPauseReason(reason);

      try { fetch('/api/timers/', {
            method: 'PUT',
            headers: { "Content-Type": "application/json", "Accept": "application/json", 'X-CSRF-TOKEN': "{{ csrf_token() }}", "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`},
            body: JSON.stringify(pauseReason)
          }).then(response => response.json()).then(data => {
              if (data != {}) {
                console.log("happy happy happy");
          }})}
          catch(error) {
              console.log(error);
          }

    } else {
      setIsPaused(!isPaused);
      if (!isPaused) {
        setPauseReason("");
        try { fetch('/api/timers/', {
            method: 'PUT',
            headers: { "Content-Type": "application/json", "Accept": "application/json", 'X-CSRF-TOKEN': "{{ csrf_token() }}", "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`},
          }).then(response => response.json()).then(data => {
                console.log("happy happy happy");
          })}
          catch(error) {
              console.log(error);
          }
      }
    }
  }

  return (
    <div className="pomodoro">
      <div className="message">
        {displayMessage && <div>Break time! New session starts in:</div>}
      </div>
      <div className="timer">
        <img src={isPaused ? "https://www.freepnglogos.com/uploads/play-button-png/circular-play-button-svg-png-icon-download-onlinewebfontsm-30.png" : "https://static.vecteezy.com/system/resources/previews/009/992/357/original/pause-icon-sign-symbol-design-free-png.png"} className="play" onClick={handlePlayPauseClick} />
        <div className="timer_text">
          {timerMinutes}:{timerSeconds}
        </div>
      </div>
    </div>
  );
}
