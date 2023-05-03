import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from '../components/Sidebar';
import axiosClient from "../axios"; 
import { useStateContext } from "../context/ContextProvider";
import { UserMenu } from "../components/UserDropdown";
import { Children, createContext, useContext, useState } from "react";
import Pomodoro from "../components/Pomodoro"; 

const StateContext = createContext({
    pomodoroDuration: null,
    taskID: null,
    pomodoroType: null,
    setDuration: () => {},
    setID: () => {},
    setType: () => {},
})

const navigation = [
    { name: "Dashboard", to: "/" },
    { name: "Statistics", to: "/statistics" },
]

export default function MemberLayout() {
    const [pomodoroDuration, setDuration] = useState({});
    const [taskID, setID] = useState();
    const [pomodoroType, setType] = useState({});
    const { pomo, userToken, setUser, setToken } = useStateContext();


    console.log(userToken);
    console.log("hi" + userToken);

    if (!userToken) {
        console.log(userToken);
        return <Navigate to="/login" />
    }

    return (
        <div> 
            <UserMenu />    
            <div className="App" id="outer-container">
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} className="side-bar" />
                <div id="page-wrap">
            </div>
            <Pomodoro />
        </div>
            <Outlet />
        </div>
    )
} 