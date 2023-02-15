type DrawDeckProps = {
  cards: { name: string; id: number; stats: number }[];
};

const DrawDeck = ({ cards }: DrawDeckProps) => {
  const numberOfCards = cards.length;

  return (
    <div className="absolute bottom-7 left-7">
      <span>Draw Pile</span>
      <button>{numberOfCards}</button>
    </div>
  );
};

export default DrawDeck;
