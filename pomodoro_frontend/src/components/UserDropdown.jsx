import { useStateContext } from "../context/ContextProvider";

export const UserMenu = () => { 

    const { currentUser, userToken, setUser, setToken } = useStateContext();

    const logOut = (ev) => {
        ev.preventDefault();
        try { fetch('/api/users/logout', {
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
        <button onClick={logOut} className="user-menu">Log Out</button>
    )
}