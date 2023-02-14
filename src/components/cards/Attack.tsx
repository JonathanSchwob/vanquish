type AttackProps = {
  click(position: number): void;
  position: number;
};

const Attack = ({ click, position }: AttackProps) => {
  return (
    <button onClick={() => click(position)}>
      <span className="text-lg">Attack</span>
      <span className="block text-sm">Deal 8 damage</span>
    </button>
  );
};

export default Attack;
