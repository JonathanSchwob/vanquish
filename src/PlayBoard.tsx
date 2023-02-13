import { useState } from "react";
import Player from "./components/Player";
import Enemy from "./components/Enemy";
import Hand from "./components/Hand";

const PlayBoard = () => {
  const [playerHp, setPlayerHp] = useState(50);
  const [enemyHp, setEnemyHp] = useState(40);
  const [handSize, setHandSize] = useState(8);

  const cardClick = () => {
    const temp = enemyHp - 8;
    setEnemyHp(temp);
  };

  return (
    <>
      <Player hp={playerHp} />
      <Enemy hp={enemyHp} />
      <Hand />
    </>
  );
};

export default PlayBoard;

// click card
// card gets put into discard pile
// card effect occurs on enemy
