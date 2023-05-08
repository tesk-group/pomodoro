import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { TrelloParser } from './TrelloParser';
import { TrelloConnect } from './TrelloConnect';
import axios from '../axios';
import { useState, useEffect } from 'react';

const isConnected = () => {
  return axios
    .get("/api/users/me")
    .then((response) => {
      return response.data.linked_providers.includes("trello");
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
}

export function Sidebar(props) { 
  
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    isConnected().then((isConnected) => setConnected(isConnected));
  }, []);

  return(
    <div>
      <Menu>
          {connected && (
            <button id="overall_view"> Impored Kanban Tasks </button>
          )}
        <TrelloConnect />
        <TrelloParser updateTaskID={props.updateTaskID} updateTaskName={props.updateTaskName}/>
      </Menu>
    </div>
  )
}
