import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard } from "./api/createCard";
import { deleteCard } from "./api/deleteCard";
import { getDeck } from "./api/getDeck";
import { TDeck } from "./api/getDecks";
import "./Card.css";

function Deck() {
  const [cards, setCards] = useState<string[]>([]);
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [text, setText] = useState("");
  const { deckId } = useParams();

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);
    setText("");
  }

  async function handleDeleteCard(index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
  }

  useEffect(() => {
    (async () => {
      if (!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    })();
  }, [deckId]);

  return (
    <div className="Deck">
      <h1>{deck?.title}</h1>
      <ul className="cards">
        {cards.map((card, index) => (
          <li key={index}>
            {card}
            <button
              onClick={() => {
                handleDeleteCard(index);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleCreateDeck}>
        <label htmlFor="card-title">Card Title</label>
        <input
          type="text"
          id="card-title"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        />
        <button>Create Card</button>
      </form>

      <span className="home-link">
        <Link to={"/"}>Go Home</Link>
      </span>
    </div>
  );
}

export default Deck;
