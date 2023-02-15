type EnemyProps = {
  hp: number;
};

const Enemy = ({ hp }: EnemyProps) => {
  return (
    <div className="inline-block p-8">
      <div>{hp}</div>
      <div>EnemyStats</div>
      <div>EnemyIntent</div>
    </div>
  );
};

export default Enemy;
