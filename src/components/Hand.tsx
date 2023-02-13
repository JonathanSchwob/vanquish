import Attack from "./cards/Attack";

type HandProps = {
  cardClick: void;
};

const Hand = ({ cardClick }: HandProps) => {
  const click = () => {};

  const cards = [<Attack click={cardClick} />];

  return <div className="block absolute bottom-14">{cards}</div>;
};

export default Hand;
