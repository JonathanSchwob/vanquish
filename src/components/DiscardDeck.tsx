type DiscardDeckProps = {
  cards: { name: string; id: number; stats: number }[];
};

const DiscardDeck = ({ cards }: DiscardDeckProps) => {
  const numberOfCards = cards.length;

  return (
    <div className="absolute bottom-7 right-7">
      <span>Discard Pile</span>
      <button>{numberOfCards}</button>
    </div>
  );
};

export default DiscardDeck;
