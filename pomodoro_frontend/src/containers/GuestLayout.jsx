import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function GuestLayout() {
    const { userToken } = useStateContext();

    if (userToken) {
        console.log(userToken);
        return <Navigate to="/" />
    }

    return (
        <div className="guest_flex"> 
            <p className="logo"> AgilePomodoro </p>
            <Outlet />
        </div>
    )
}