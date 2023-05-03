import { createBrowserRouter, Navigate } from "react-router-dom";
import { LogIn } from "./containers/LogIn";
import { Register } from "./containers/Register";
import { Dashboard } from "./containers/Dashboard";
import { Statistics } from "./containers/Statistics";
import GuestLayout from "./containers/GuestLayout";
import MemberLayout from "./containers/MemberLayout";

const router = createBrowserRouter([
    { 
        path: '/',
        element: <MemberLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Navigate to="/" />
            },
            {
                path: "/",
                element: <Dashboard />
            },
            {
                path: 'statistics',
                element: <Statistics />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: 'login',
                element: <LogIn />
            },
            {
                path: 'register',
                element: <Register />
            }, 
        ]
    }
])
export default router;