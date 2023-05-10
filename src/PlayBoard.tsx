import { useState, useEffect } from "react";
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
  energy: number;
};

const initializeDeck = () => {
  const starterDeck = [
    {
      name: "Attack",
      id: 1,
      stats: 8,
      energy: 1,
    },
    {
      name: "Attack",
      id: 2,
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
      name: "Attack",
      id: 4,
      stats: 8,
      energy: 1,
    },
    {
      name: "Attack",
      id: 5,
      stats: 8,
      energy: 1,
    },
    {
      name: "Defend",
      id: 6,
      stats: 4,
      energy: 1,
    },
    {
      name: "Defend",
      id: 7,
      stats: 4,
      energy: 1,
    },
    {
      name: "Defend",
      id: 8,
      stats: 4,
      energy: 1,
    },
    {
      name: "Defend",
      id: 9,
      stats: 4,
      energy: 1,
    },
  ];

  return shuffle(starterDeck);
};

const shuffle = (deck: CardType[]) => {
  let currentIndex = deck.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [deck[currentIndex], deck[randomIndex]] = [
      deck[randomIndex],
      deck[currentIndex],
    ];
  }

  return deck;
};

const PlayBoard = () => {
  const [deckCards, setDeckCards] = useState<CardType[]>(initializeDeck());
  const [handCards, setHandCards] = useState<CardType[]>(initializeHand());
  const [discardCards, setDiscardCards] = useState<CardType[]>([]);
  const [exhaustCards, setExhaustCards] = useState<CardType[]>([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [turnNumber, setTurnNumber] = useState(0);
  const [playerEnergy, setPlayerEnergy] = useState(3);
  const [playerHp, setPlayerHp] = useState(50);
  const [playerBlock, setPlayerBlock] = useState(0);
  const [enemyMoves, setEnemyMoves] = useState([
    10, 20, 2, 10, 2, 20, 10, 15, 20,
  ]);
  const [enemyHp, setEnemyHp] = useState(40);
  const [enemyBlock, setEnemyBlock] = useState(0);

  function initializeHand() {
    const newDeckCards = [...deckCards];
    const newHandCards = newDeckCards.splice(-5);
    // setDeckCards(newDeckCards);
    return newHandCards;
  }

  const handlePlay = (turn: boolean) => {
    if (playerHp <= 0) return;
    if (turn) return;
    setTimeout(() => {
      const remainingBlock = playerBlock - enemyMoves[turnNumber];
      if (remainingBlock <= 0) {
        setPlayerBlock(0);
        setPlayerHp((playerHp) => playerHp + remainingBlock);
      } else {
        setPlayerBlock(remainingBlock);
      }
      startTurn();
    }, 1000);
  };

  const startTurn = () => {
    setPlayerTurn(true);
    setPlayerEnergy(3);
    setTurnNumber((turnNumber) => turnNumber + 1);
  };

  const endTurn = () => {
    if (playerHp <= 0) return;
    const turn = false;
    setPlayerTurn(turn);
    discardHand();
    handlePlay(turn);
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
      <Enemy hp={enemyHp} block={enemyBlock} move={enemyMoves[turnNumber]} />
      <EndTurn playerTurn={playerTurn} click={endTurn} />
      <Hand cards={handCards} cardClick={cardClick} />
      <DiscardDeck cards={discardCards} />
    </>
  );
};

export default PlayBoard;

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
//TODO Auth, add a back end
//TODO high score leaderboard
//TODO brainstorm altering the game design
