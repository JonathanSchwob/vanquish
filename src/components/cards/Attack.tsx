type AttackProps = {
  click: (event: React.MouseEvent<HTMLElement>) => void;
};

const Attack = ({ click }: AttackProps) => {
  return (
    <button onClick={click}>
      <span className="text-lg">Attack</span>
      <span className="block text-sm">Deal 8 damage</span>
    </button>
  );
};

export default Attack;
