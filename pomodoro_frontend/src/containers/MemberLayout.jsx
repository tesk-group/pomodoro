import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from '../components/Sidebar';
import axiosClient from "../axios"; 
import { useStateContext } from "../context/ContextProvider";

const navigation = [
    { name: "Dashboard", to: "/" },
    { name: "Statistics", to: "/statistics" },
]

export default function MemberLayout() {

    const { currentUser, userToken, setUser, setToken } = useStateContext();

    console.log(userToken);
    console.log("hi" + userToken);

    if (!userToken) {
        console.log(userToken);
        return <Navigate to="/login" />
    }

    const logOut = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then((res) => {
            setUser({});
            setToken(null);
            try { fetch('http://localhost:8000/api/users/', {
                method: 'GET',
                headers: { "Content-Type": "application/json", "Accept": "application/json", 'X-CSRF-TOKEN': "{{ csrf_token() }}", "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`},
            })}
            catch(error) {
                console.log(error);
            }
        });
    }

    return (
        <div> 
            <div className="App" id="outer-container">
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id="page-wrap">
            </div>
        </div>
            <Outlet />
        </div>
    )
} 