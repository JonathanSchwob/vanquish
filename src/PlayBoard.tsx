import { useState } from "react";
import Player from "./components/entities/Player";
import Enemy from "./components/entities/Enemy";
import Hand from "./components/Hand";
import DiscardDeck from "./components/DiscardDeck";
import DrawDeck from "./components/DrawDeck";

type CardType = {
  name: string;
  id: number;
  stats: number;
};

//TODO turn system
//TODO emojis/card art
//TODO enemy intent
//TODO draw deck features
//TODO discard deck features
//TODO pick phase
//TODO find out if routing or conditional rendering or useEffects should be used to transition between PickPhase an PlayPhase
//TODO stop hardcoding cards
//TODO exhaust deck

const PlayBoard = () => {
  const [playerHp, setPlayerHp] = useState(50);
  const [playerBlock, setPlayerBlock] = useState(0);
  const [enemyHp, setEnemyHp] = useState(40);
  const [enemyBlock, setEnemyBlock] = useState(0);
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
    }
    setDiscardCards(newDiscardDeck);
    setHandCards((handCards) => handCards.filter((card) => card.id != id));
  };

  return (
    <>
      <DrawDeck cards={deckCards} />
      <Player hp={playerHp} block={playerBlock} />
      <Enemy hp={enemyHp} />
      <Hand cards={handCards} cardClick={cardClick} />
      <DiscardDeck cards={discardCards} />
    </>
  );
};

export default PlayBoard;
