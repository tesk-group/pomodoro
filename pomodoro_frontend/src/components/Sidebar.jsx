import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { TrelloParser } from './TrelloParser';
import { TrelloConnect } from './TrelloConnect';

export function Sidebar(props) { 

  return(
    <div>
      <Menu>
        <TrelloConnect />
        <TrelloParser updateTaskID={props.updateTaskID}/>
      </Menu>
    </div>
  )
}
