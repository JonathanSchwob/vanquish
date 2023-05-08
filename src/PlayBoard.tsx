import { useEffect, useState, useTransition } from "react";
import Player from "./components/entities/Player";
import Enemy from "./components/entities/Enemy";
import Hand from "./components/Hand";
import DiscardDeck from "./components/DiscardDeck";
import DrawDeck from "./components/DrawDeck";
import EndTurn from "./components/EndTurn";

class Card {
  name: "Attack" | "Defend";
  id: number;
  stats: number;
  deck: "hand" | "draw" | "discard";
  energy: number;
  constructor(
    name: "Attack" | "Defend",
    id: number,
    stats: number,
    deck: "hand" | "draw" | "discard" = "draw",
    energy = 1
  ) {
    this.name = name;
    this.id = id;
    this.stats = stats;
    this.deck = deck;
    this.energy = energy;
  }
}

const PlayBoard = () => {
  const [playerTurn, setPlayerTurn] = useState(true);
  const [playerEnergy, setPlayerEnergy] = useState(3);
  const [playerHp, setPlayerHp] = useState(50);
  const [playerBlock, setPlayerBlock] = useState(0);
  const [enemyMoves, setEnemyMoves] = useState([
    10, 20, 2, 10, 2, 20, 10, 15, 20,
  ]); //hardcode
  const [enemyHp, setEnemyHp] = useState(40);
  const [enemyBlock, setEnemyBlock] = useState(0);

  const stockCards = [];
  for (let i = 0; i < 7; i++) {
    const name = Math.random() > 0.5 ? "Attack" : "Defend";
    const id = Math.floor(Math.random() * 10000);
    const stats = name === "Attack" ? 8 : 4;
    const deck = i < 5 ? "hand" : "draw";
    stockCards.push(new Card(name, id, stats, deck));
  }

  const [cards, setCards] = useState<Card[]>(stockCards);

  const [turnNumber, setTurnNumber] = useState(0);

  const handlePlay = (turn: boolean) => {
    if (playerHp <= 0) return;
    if (turn) {
      return;
    }
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

  const dealCards = () => {
    let handCards = cards.filter((card) => card.deck === "hand");
    //baseCase
    if (handCards.length >= 5) return;

    let drawCards = cards.filter((card) => card.deck === "draw");
    let disCards = cards.filter((card) => card.deck === "discard");

    const dealNum = 5 - handCards.length;
    if (drawCards.length === 0) {
      //put disCards into drawCards
      disCards = disCards
        .map((card) => {
          card.deck = "draw";
          return card;
        })
        //shuffle
        .sort((card) => 0.5 - Math.random());
    }
    if (drawCards.length < dealNum) {
      drawCards = drawCards.map((card) => {
        card.deck = "hand";
        return card;
      });
      setCards(handCards.concat(drawCards, disCards));
      dealCards();
      return;
    } else {
      drawCards = drawCards.map((card, i) => {
        if (i < dealNum) {
          card.deck = "hand";
        }
        return card;
      });
    }
    setCards(handCards.concat(drawCards, disCards));
    return;
  };

  const startTurn = () => {
    setPlayerEnergy(3);
    dealCards();
    setPlayerTurn(true);
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
    const newCards = cards.slice().map((card) => {
      const newCard = structuredClone(card);
      if (newCard.deck === "hand") {
        newCard.deck = "discard";
      }
      return newCard;
    });
    setCards(newCards);
  };

  const cardClick = (id: number) => {
    if (!playerTurn) return;
    if (playerHp <= 0) return;
    if (playerEnergy <= 0) return;
    const clickedCard = cards.find((card) => card.id === id);

    if (clickedCard) {
      //play card
      if (clickedCard.name === "Attack") {
        setEnemyHp((enemyHp) => enemyHp - clickedCard.stats);
      }
      if (clickedCard.name === "Defend") {
        setPlayerBlock((playerBlock) => playerBlock + clickedCard.stats);
      }
      //discard
      setPlayerEnergy((playerEnergy) => playerEnergy - clickedCard.energy);
    } else {
      console.error("cardClick could not find card id=", id);
      return;
    }

    // discard clicked card
    setCards((cards) => {
      const newCards = cards.map((card) => {
        if (card.id === id) {
          card.deck = "discard";
        }
        return card;
      });
      return newCards;
    });
  };

  return (
    <>
      <span className="absolute left-7">Energy: {playerEnergy}</span>
      <DrawDeck cards={cards.filter((card) => card.deck === "draw")} />
      <Player hp={playerHp} block={playerBlock} />
      <Enemy hp={enemyHp} block={enemyBlock} move={enemyMoves[turnNumber]} />
      <EndTurn playerTurn={playerTurn} click={endTurn} />
      <Hand
        cards={cards.filter((card) => card.deck === "hand")}
        cardClick={cardClick}
      />
      <DiscardDeck cards={cards.filter((card) => card.deck === "discard")} />
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
