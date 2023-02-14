type DefendProps = {
  click(position: number): void;
  position: number;
};

const Defend = ({ click, position }: DefendProps) => {
  return (
    <button onClick={() => click(position)}>
      <span className="text-lg">Defend</span>
      <span className="block text-sm">Gain 4 Block</span>
    </button>
  );
};

export default Defend;
