import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { useStateContext } from "../context/ContextProvider";
import { TrelloParser } from './TrelloParser';
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../axios";
import { useState } from 'react';

export function Sidebar(props) { 

  const { currentUser, userToken, setUser, setToken } = useStateContext();
  const [taskID, setID] = useState();

  const connectTrello = () => {
    axios.get('/api/oauth/trello/endpoint')
    .then(response => response.json()).then(data => {
      console.log(data);
    })
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
        <button onClick={connectTrello}> Connect Trello </button>
        <TrelloParser updateTaskID={props.updateTaskID}/>
      </Menu>
    </div>
  )
}
