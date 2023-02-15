import Attack from "./cards/Attack";
import Defend from "./cards/Defend";

type HandProps = {
  cardClick(id: number): void;
  cards: { name: string; id: number; stats: number }[];
};

const Hand = ({ cardClick, cards }: HandProps) => {
  const renderCards = cards.map((card) => {
    if (card.name === "Attack")
      return <Attack key={card.id} id={card.id} click={cardClick} />;
    if (card.name === "Defend")
      return <Defend key={card.id} id={card.id} click={cardClick} />;
  });

  return <div className="block absolute bottom-14">{renderCards}</div>;
};

export default Hand;
