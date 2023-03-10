type DefendProps = {
  click(id: number): void;
  id: number;
};

const Defend = ({ click, id }: DefendProps) => {
  return (
    <button onClick={() => click(id)}>
      <span className="text-lg">Defend</span>
      <span className="block text-sm">Gain 4 Block</span>
      <span className="block text-sm">-1 energy</span>
    </button>
  );
};

export default Defend;
