import { useStateContext } from "../context/ContextProvider";

import axios from "../axios";

export const UserMenu = () => { 

  const { currentUser, userToken, setUser, setToken } = useStateContext();

  const logOut = (ev) => {
    ev.preventDefault();
    axios.get('/api/users/logout')
      .catch(function (error) {
        let response = error.response.data;
        let errorMessage = response.errors;
          
        if (typeof errorMessage !== 'string') {
          errorMessage = response.errors[Object.keys(response.errors)[0]];
        }
          
        alert(errorMessage);
      });
      setUser({});
      setToken(null);
  };

  return(
    <button onClick={logOut} className="user-menu">Log Out</button>
  )
}
