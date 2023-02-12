type PlayerProps = {
  hp: number;
};

const Player = ({ hp }: PlayerProps) => {
  return (
    <div className="inline-block p-8">
      <div>{hp}</div>
      <div>PlayerStats</div>
    </div>
  );
};

export default Player;
