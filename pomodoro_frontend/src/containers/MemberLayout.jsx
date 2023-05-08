import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from '../components/Sidebar';
import { useStateContext } from "../context/ContextProvider";
import { Pomodoro } from "../components/Pomodoro"; 
import { useEffect, useState } from "react";
import Statistics from "./Statistics";
import { LogOut } from "../components/LogOut";

export default function MemberLayout() {
  const [taskID, setID] = useState();
  const {userToken } = useStateContext();
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
        <LogOut />
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
