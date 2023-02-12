type EnemyProps = {
  hp: number;
};

const Enemy = ({ hp }: EnemyProps) => {
  return (
    <>
      <div>{hp}</div>
      <div>EnemyStats</div>
      <div>EnemyIntent</div>
    </>
  );
};

export default Enemy;
