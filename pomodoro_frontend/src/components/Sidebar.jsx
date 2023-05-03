import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { useStateContext } from "../context/ContextProvider";
import CardUploader from './TrelloParser';


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

    const connectTrello = () => {
        try {fetch('http://localhost:8000/a/api/oauth/trello/endpoint', {
            method: 'GET',
            headers: { "Content-Type": "application/json", "Accept": "application/json", 'X-CSRF-TOKEN': "{{ csrf_token() }}", "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`},
        })}
        catch(error) {
            console.log(error);
        }
    }
    return(
        <div>
            <Menu>
                <CardUploader />
            </Menu>
        </div>
    )
}