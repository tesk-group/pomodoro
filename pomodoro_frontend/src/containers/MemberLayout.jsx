import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from '../components/Sidebar';
import axiosClient from "../axios"; 
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
      <UserMenu />
      <div className="App" id="outer-container">
        {showStatistics ? null : (
          <>
            <Sidebar
              updateTaskID={updateTaskID}
              pageWrapId={"page-wrap"}
              outerContainerId={"outer-container"}
              className="side-bar"
            />
            <div id="page-wrap">
              <Pomodoro taskID={taskID} />
            </div>
          </>
        )}
        <Outlet />
        <button
          onClick={() => navigate(showStatistics ? "/" : "/statistics")} 
        >
          {showStatistics ? "Dashboard" : "Statistics"} 
        </button>
      </div>
      {showStatistics && <Statistics />}
    </div>
  );
}
