import { useStateContext } from "../context/ContextProvider";
import { useState, useEffect } from "react";
import axios from "../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";


export const LogOut = () => { 

  const [user, setUser] = useState(null);

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
      setUser(null);
  };

  useEffect(() => {
    isConnected().then((username) => {
      setUser(username);
    });
  })

  const isConnected = () => {
    return axios
      .get("/api/users/me")
      .then((response) => {
        return response.data.username;
      })
      .catch(function (error) {
        console.log(error);
        let response = error.response.data;
        let errorMessage = response.errors;
  
        if (typeof errorMessage !== "string") {
          errorMessage = response.errors[Object.keys(response.errors)[0]];
        }
  
        alert(errorMessage);
        return false;
      });
  };

  return(
    <>
      <div className="log_out">
        {user && <p className="username">
          <FontAwesomeIcon icon={faUser} size="1x" className="user_icon"/> 
          {user}
        </p>}
        <button onClick={logOut}>Log Out</button> 
      </div>
    </>
  )
}
