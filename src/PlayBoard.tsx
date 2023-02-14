import { useState } from "react";
import Player from "./components/Player";
import Enemy from "./components/Enemy";
import Hand from "./components/Hand";

type CardType = {
  name: string;
  id: number;
  stats: number;
};

const PlayBoard = () => {
  //player
  const [playerHp, setPlayerHp] = useState(50);
  const [playerBlock, setPlayerBlock] = useState(0);
  //enemy
  const [enemyHp, setEnemyHp] = useState(40);
  const [enemyBlock, setEnemyBlock] = useState(0);
  //discard
  const [discardPile, setDiscardPile] = useState<CardType[]>([]);
  //hand
  const maxHandSize = 10;
  const [handSize, setHandSize] = useState(8);
  const [handCards, setHandCards] = useState([
    {
      name: "Attack",
      id: 0,
      stats: 8,
    },
    {
      name: "Attack",
      id: 3,
      stats: 8,
    },
    {
      name: "Defend",
      id: 9,
      stats: 4,
    },
    {
      name: "Attack",
      id: 20,
      stats: 8,
    },
  ]);

  const cardClick = (id: number) => {
    const newDiscardPile = [...discardPile];
    const clickedCard = handCards.find((card) => card.id === id);
    console.log(clickedCard, "clik");
    if (clickedCard) {
      if (clickedCard.name === "Attack") {
        setEnemyHp((enemyHp) => enemyHp - clickedCard.stats);
      }
      if (clickedCard.name === "Defend") {
        setPlayerBlock((playerBlock) => playerBlock + clickedCard.stats);
      }
      //discard
      newDiscardPile.push(clickedCard);
    }
    setDiscardPile(newDiscardPile);
    setHandCards((handCards) => handCards.filter((card) => card.id != id));
  };

  return (
    <>
      <Player hp={playerHp} block={playerBlock} />
      <Enemy hp={enemyHp} />
      <Hand cards={handCards} cardClick={cardClick} />
    </>
  );
};

export default PlayBoard;

// click card
// card gets put into discard pile
// card effect occurs on enemy
