type PlayerProps = {
  hp: number;
  block: number;
};

const Player = ({ hp, block }: PlayerProps) => {
  return (
    <div className="inline-block p-8">
      <div>{hp}</div>
      <div>Block: {block}</div>
    </div>
  );
};

export default Player;
