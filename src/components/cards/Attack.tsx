type AttackProps = {
  click(id: number): void;
  id: number;
};

const Attack = ({ click, id }: AttackProps) => {
  return (
    <button onClick={() => click(id)}>
      <span className="text-lg">Attack</span>
      <span className="block text-sm">Deal 8 damage</span>
      <span className="block text-sm">-1 energy</span>
    </button>
  );
};

export default Attack;
