import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from '../components/Sidebar';
import { useStateContext } from "../context/ContextProvider";
import { UserMenu } from "../components/UserDropdown";
import { Pomodoro } from "../components/Pomodoro"; 
import { useEffect, useState, createContext } from "react";
import { Statistics } from "./Statistics";

export default function MemberLayout() {
  const [pomodoroDuration, setDuration] = useState({});
  const [taskID, setID] = useState();
  const [pomodoroType, setType] = useState({});
  const { pomo, userToken, setUser, setToken } = useStateContext();
  const location = useLocation();
  const [showSidebarAndPomodoro, setShowSidebarAndPomodoro] = useState(true);
  const [showStatistics, setShowStatistics] = useState(false);
  const navigate = useNavigate(); 
  const updateTaskID = (id) => {
    setID(id);
  };

  useEffect(() => {
    setShowStatistics(location.pathname === "/statistics");
  }, [location]);

  if (!userToken) {
    console.log(userToken);
    return <Navigate to="/login" />;
  }

  return (
    <div>
        <p className="logo"> AgilePomodoro </p>
        <UserMenu />
        <div className="App" id="outer_container">
        {showSidebarAndPomodoro && (
          <Sidebar
            updateTaskID={updateTaskID}
            pageWrapId={"page_wrap"}
            outerContainerId={"outer_container"}
            className="side_bar"
          />
        )}
        <div id="page_wrap">
            {showSidebarAndPomodoro && <Pomodoro taskID={taskID} />}
            {showStatistics && (
            <div className="statistics_overlay">
              <Statistics />
              <button onClick={() => setShowStatistics(false)}>Close</button>
            </div>
          )}
        </div>
        <button
          onClick={() => {
            setShowSidebarAndPomodoro(!showStatistics);
            setShowStatistics(!showStatistics);
          }}
        >
          {showStatistics ? "Dashboard" : "Statistics"}
        </button>
        </div>
    </div>
  );
}
