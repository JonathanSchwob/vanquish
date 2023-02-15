type DiscardPileProps = {
  cards: { name: string; id: number; stats: number }[];
};

const DiscardPile = ({ cards }: DiscardPileProps) => {
  const numberOfCards = cards.length;
  return (
    <>
      <span>Discard Pile</span>
      <button>{numberOfCards}</button>
    </>
  );
};

export default DiscardPile;
