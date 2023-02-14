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
  //hand
  const [handSize, setHandSize] = useState(8);
  const [handCardStrings, setHandCardStrings] = useState([
    "Attack",
    "Defend",
    "Attack",
    "Defend",
    "Attack",
  ]);

  const cardClick = (position: number) => {
    setHandCardStrings((handCardStrings) =>
      handCardStrings.filter((item, index) => index !== position)
    );
    //discard()
    setEnemyHp((enemyHp) => enemyHp - 8);
  };

  return (
    <>
      <Player hp={playerHp} />
      <Enemy hp={enemyHp} />
      <Hand cards={handCardStrings} cardClick={cardClick} />
    </>
  );
};

export default PlayBoard;

// click card
// card gets put into discard pile
// card effect occurs on enemy
