type DrawDeckProps = {
  cards: { name: string; id: number; stats: number }[];
};

const DrawDeck = ({ cards }: DrawDeckProps) => {
  const numberOfCards = cards.length;
  return (
    <>
      <span>Draw Pile</span>
      <button>{numberOfCards}</button>
    </>
  );
};

export default DrawDeck;
