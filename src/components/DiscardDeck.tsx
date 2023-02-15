type DiscardDeckProps = {
  cards: { name: string; id: number; stats: number }[];
};

const DiscardDeck = ({ cards }: DiscardDeckProps) => {
  const numberOfCards = cards.length;
  return (
    <>
      <span>Discard Pile</span>
      <button>{numberOfCards}</button>
    </>
  );
};

export default DiscardDeck;
