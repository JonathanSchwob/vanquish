import { useState } from "react";
import Player from "./components/Player";
import Enemy from "./components/Enemy";
import Hand from "./components/Hand";
import DiscardPile from "./components/DiscardPile";

type CardType = {
  name: string;
  id: number;
  stats: number;
};

//TODO emojis/card art
//TODO draw pile
//TODO turn system
//TODO enemy intent

const PlayBoard = () => {
  //player
  const [playerHp, setPlayerHp] = useState(50);
  const [playerBlock, setPlayerBlock] = useState(0);
  //enemy
  const [enemyHp, setEnemyHp] = useState(40);
  const [enemyBlock, setEnemyBlock] = useState(0);
  //discard pile
  const [discardedCards, setDiscardedCards] = useState<CardType[]>([]);
  //hand of cards
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
    const newDiscardPile = [...discardedCards];
    const clickedCard = handCards.find((card) => card.id === id);
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
    setDiscardedCards(newDiscardPile);
    setHandCards((handCards) => handCards.filter((card) => card.id != id));
  };

  return (
    <>
      <Player hp={playerHp} block={playerBlock} />
      <Enemy hp={enemyHp} />
      <Hand cards={handCards} cardClick={cardClick} />
      <DiscardPile cards={discardedCards} />
    </>
  );
};

export default PlayBoard;
