import { useState } from "react";
import Player from "./components/entities/Player";
import Enemy from "./components/entities/Enemy";
import Hand from "./components/Hand";
import DiscardDeck from "./components/DiscardDeck";
import DrawDeck from "./components/DrawDeck";
import EndTurn from "./components/EndTurn";

type CardType = {
  name: string;
  id: number;
  stats: number;
};

//TODO turn system
//TODO enemy intent
//TODO draw deck features
//TODO discard deck features
//TODO pick phase
//TODO react router for PickPhase and PlayPhase
//TODO stop hardcoding cards
//TODO more cards
//TODO exhaust deck
//TODO more enemies - never ending?
//TODO relic rewards
//TODO characters
//TODO emojis/card art
//TODO high score leaderboard
//TODO brainstorm altering the game design

const PlayBoard = () => {
  const [playerTurn, setPlayerTurn] = useState(true);
  const [playerEnergy, setPlayerEnergy] = useState(3);
  const [playerHp, setPlayerHp] = useState(50);
  const [playerBlock, setPlayerBlock] = useState(0);
  const [enemyHp, setEnemyHp] = useState(40);
  const [enemyBlock, setEnemyBlock] = useState(0);
  const [enemyMoves, setEnemyMoves] = useState([8, 4, 2, 10, 2]);
  const [exhaustCards, setExhaustCards] = useState<CardType[]>([]);
  const [discardCards, setDiscardCards] = useState<CardType[]>([]);
  const [deckCards, setDeckCards] = useState([
    {
      name: "Defend",
      id: 123124,
      stats: 4,
    },
    {
      name: "Attack",
      id: 192123918092,
      stats: 8,
    },
  ]);
  const [handCards, setHandCards] = useState([
    {
      name: "Attack",
      id: 0,
      stats: 8,
      energy: 1,
    },
    {
      name: "Attack",
      id: 3,
      stats: 8,
      energy: 1,
    },
    {
      name: "Defend",
      id: 9,
      stats: 4,
      energy: 1,
    },
    {
      name: "Defend",
      id: 1231231,
      stats: 4,
      energy: 1,
    },
    {
      name: "Attack",
      id: 20,
      stats: 8,
      energy: 1,
    },
  ]);
  const [turnNumber, setTurnNumber] = useState(0);

  const handlePlay = () => {
    if (playerHp <= 0) return;
    // if (playerTurn) return;
    console.log("hello");
    let i = 0;
    setTimeout(() => {
      setPlayerHp((playerHp) => playerHp + playerBlock - enemyMoves[i]);
      if (i >= 4) {
        i = 0;
      }
      i++;
      startTurn();
    }, 1000);
  };

  const startTurn = () => {
    setPlayerTurn(true);
    setPlayerEnergy(3);
  };

  const endTurn = () => {
    if (playerHp <= 0) return;
    setPlayerTurn(false);
    discardHand();
    handlePlay();
  };

  const discardHand = () => {
    const newDiscardDeck = [...discardCards];
    newDiscardDeck.push(...handCards);
    setHandCards([]);
    setDiscardCards(newDiscardDeck);
  };

  const cardClick = (id: number) => {
    if (!playerTurn) return;
    if (playerHp <= 0) return;
    if (playerEnergy <= 0) return;
    const newDiscardDeck = [...discardCards];
    const clickedCard = handCards.find((card) => card.id === id);

    if (clickedCard) {
      //play card
      if (clickedCard.name === "Attack") {
        setEnemyHp((enemyHp) => enemyHp - clickedCard.stats);
      }
      if (clickedCard.name === "Defend") {
        setPlayerBlock((playerBlock) => playerBlock + clickedCard.stats);
      }
      //discard
      newDiscardDeck.push(clickedCard);
      setPlayerEnergy((playerEnergy) => playerEnergy - clickedCard.energy);
    }

    setHandCards((handCards) => handCards.filter((card) => card.id != id));
    setDiscardCards(newDiscardDeck);
  };

  return (
    <>
      <span className="absolute left-7">Energy: {playerEnergy}</span>
      <DrawDeck cards={deckCards} />
      <Player hp={playerHp} block={playerBlock} />
      <Enemy hp={enemyHp} block={enemyBlock} />
      <EndTurn playerTurn={playerTurn} click={endTurn} />
      <Hand cards={handCards} cardClick={cardClick} />
      <DiscardDeck cards={discardCards} />
    </>
  );
};

export default PlayBoard;
