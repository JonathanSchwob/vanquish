import Attack from "./cards/Attack";
import Defend from "./cards/Defend";

type HandProps = {
  cardClick(position: number): void;
  cards: string[];
};

const Hand = ({ cardClick, cards }: HandProps) => {
  const renderCards = cards.map((a, b) => {
    if (a === "Attack")
      return <Attack key={b} position={b} click={cardClick} />;
    if (a === "Defend")
      return <Defend key={b} position={b} click={cardClick} />;
  });

  return <div className="block absolute bottom-14">{renderCards}</div>;
};

export default Hand;
