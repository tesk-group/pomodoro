import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { useStateContext } from "../context/ContextProvider";
import CardUploader from './TrelloParser';

import axios from "../axios";

export const Sidebar = () => { 

  const { currentUser, userToken, setUser, setToken } = useStateContext();

  const logOut = (ev) => {
    ev.preventDefault();
    axios.get('/api/users/logout')
      .then(() => {})
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

  const connectTrello = () => {
    axios.get('/api/oauth/trello/endpoint')
      .then(() => {})
      .catch(function (error) {
        let response = error.response.data;
        let errorMessage = response.errors;
      
        if (typeof errorMessage !== 'string') {
          errorMessage = response.errors[Object.keys(response.errors)[0]];
        }
      
        alert(errorMessage);
      });
  }
    
  return(
    <div>
      <Menu>
        <CardUploader />
      </Menu>
    </div>
  )
}
