import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { useStateContext } from "../context/ContextProvider";
import axiosClient from '../axios';


export const Sidebar = () => { 

    const { currentUser, userToken, setUser, setToken } = useStateContext();


    const logOut = (ev) => {
        ev.preventDefault();
        console.log("hmm");
        try { fetch('http://localhost:8000/api/users/logout', {
            method: 'GET',
            headers: { "Content-Type": "application/json", "Accept": "application/json", 'X-CSRF-TOKEN': "{{ csrf_token() }}", "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`},
        })}
        catch(error) {
            console.log(error);
        }
        setUser({});
        setToken(null);
    };

    return(
        <div>
            <Menu>
                <button onClick={logOut}>Hmm</button>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
                <a className="menu-item--small" href="">Settings</a>
            </Menu>
        </div>
    )
}