import { useState } from "react";
import Player from "./components/Player";
import Enemy from "./components/Enemy";
// import "./PlayBoard.css";

const PlayBoard = () => {
  const [playerHP, setPlayerHP] = useState(50);
  const [enemyHP, setEnemyHP] = useState(40);

  return (
    <>
      <Player hp={playerHP} />
      <Enemy hp={enemyHP} />
    </>
  );
};

export default PlayBoard;

// player
// enemy
// hand
//   -cards
// deck
// graveyard
// turn system
