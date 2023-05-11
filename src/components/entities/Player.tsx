type PlayerProps = {
  hp: number;
  block: number;
};

const Player = ({ hp, block }: PlayerProps) => {
  return (
    <div className="inline-block p-10">
      <div>Player</div>
      <div>HP: {hp}</div>
      <div>Block: {block}</div>
    </div>
  );
};

export default Player;
