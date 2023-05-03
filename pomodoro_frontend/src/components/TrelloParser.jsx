import { useState, useEffect } from "react";

export default function CardUploader() {
  const [cards, setCards] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const [taskID, setID] = useState();

  useEffect(() => {
    const cardsData = JSON.parse(localStorage.getItem("cardsData"));
    if (cardsData) {
      setCards(cardsData);
      setShowCards(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cardsData", JSON.stringify(cards));
  }, [cards]);

  const handleFileUpload = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const cardsData = JSON.parse(e.target.result);
      const filteredCards = filterCards(cardsData.cards);
      setCards(filteredCards);
      setShowCards(true);
    };
    reader.readAsText(event.target.files[0]);
  };

  const generateRandomId = () => {
    return Math.floor(Math.random() * 100000);
  };

  const filterCards = (cardsData) => {
    const doingCards = [];
    const doneCards = [];

    let foundDoing = false;
    let foundDone = false;

    cardsData.forEach((card) => {
      if (!foundDoing && card.name.toLowerCase().includes("doing")) {
        foundDoing = true;
      }

      if (foundDoing && !foundDone) {
        if (card.name.toLowerCase().includes("done")) {
          foundDone = true;
        } else {
          doingCards.push({ ...card, id: generateRandomId() });
        }
      }
    });

    return doingCards.concat(doneCards);
  };

  const handleClearCards = () => {
    setCards([]);
    setShowCards(false);
    setID(null);
  };

  const handleCardClick = (id) => {
    setID(id, () => {
      console.log(taskID);
    });
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
        onClick={() => handleCardClick(card.id)}
      >
        <p className="card_name">Name: {card.name}</p>
        <p className="card_id">ID: {card.id}</p>
      </button>
    ));
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button className="active" onClick={handleClearCards}>Clear Cards</button>
      {showCards && <div>{renderCards()}</div>}
    </div>
  );
}
