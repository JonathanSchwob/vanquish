type EnemyProps = {
  hp: number;
  block: number;
  move: number;
};

const Enemy = ({ hp, block, move }: EnemyProps) => {
  return (
    <div className="inline-block p-8">
      <div>{hp}</div>
      <div>Block: {block}</div>
      <div>Intent: Attack {move}</div>
    </div>
  );
};

export default Enemy;
