type EnemyProps = {
  hp: number;
  block: number;
};

const Enemy = ({ hp, block }: EnemyProps) => {
  return (
    <div className="inline-block p-8">
      <div>{hp}</div>
      <div>Block: {block}</div>
      <div>EnemyIntent</div>
    </div>
  );
};

export default Enemy;
