import { useState, useEffect } from "react";
import axios from "../axios";

export function TrelloParser(props) {
  const [cards, setCards] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const [taskID, setTaskID] = useState(null);
  const [taskName, setTaskName] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      axios.get('/api/tasks/trello/sync')
      .then(response => {
          console.log("success");
        })
        .catch(function (error) {
          console.log(error);
          let response = error.response.data;
          let errorMessage = response.errors;
        
          if (typeof errorMessage !== 'string') {
            errorMessage = response.errors[Object.keys(response.errors)[0]];
          }
        
          alert(errorMessage);
        });

      axios.get('/api/tasks/')
        .then(response => {
          setCards(response.data);
          setShowCards(true);
        })
        .catch(function (error) {
          console.log(error);
          let response = error.response.data;
          console.log(error.response);
          let errorMessage = response.errors;
              
          if (typeof errorMessage !== 'string') {
            errorMessage = response.errors[Object.keys(response.errors)[0]];
          }
          alert(errorMessage);
        });
    }
    fetchCards();
  }, []);

  useEffect(() => {
    localStorage.setItem("cardsData", JSON.stringify(cards));
  }, [cards]);

  const handleCardClick = (id, name) => {
    setTaskID(id);
    props.updateTaskName(name);
    props.updateTaskID(id);
    console.log("CARD ID IS " + id)
  };
  

  const getCardClassName = (id) => {
    if (id === taskID) {
      return "cards active";
    }
    return "cards";
  };

  const renderCards = () => {
    return cards.map((card) => (
      <button
        key={card.id}
        className={getCardClassName(card.id)}
        onClick={() => handleCardClick(card.id, card.name)}
      >
        <p className="card_name">{card.name}</p>
        <p className="card_id">ID: {card.id}</p>
      </button>
    ));
  };
  
  return (
    <div>
      {showCards && <div>{renderCards()}</div>}
    </div>
  );
}
