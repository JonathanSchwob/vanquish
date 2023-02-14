import { useState } from "react";
import Player from "./components/Player";
import Enemy from "./components/Enemy";
import Hand from "./components/Hand";

const PlayBoard = () => {
  //player
  const [playerHp, setPlayerHp] = useState(50);
  const [playerBlock, setPlayerBlock] = useState(0);
  //enemy
  const [enemyHp, setEnemyHp] = useState(40);
  const [enemyBlock, setEnemyBlock] = useState(0);
  //discard
  const [discardPile, setDiscardPile] = useState([]);
  //hand
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
    console.log(id);
    setHandCards((handCards) => handCards.filter((item) => item.id != id));
    setEnemyHp((enemyHp) => enemyHp - 8);
  };

  return (
    <>
      <Player hp={playerHp} />
      <Enemy hp={enemyHp} />
      <Hand cards={handCards} cardClick={cardClick} />
    </>
  );
};

export default PlayBoard;

// click card
// card gets put into discard pile
// card effect occurs on enemy
