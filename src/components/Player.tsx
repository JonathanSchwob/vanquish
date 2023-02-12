type PlayerProps = {
  hp: number;
};

const Player = ({ hp }: PlayerProps) => {
  return (
    <>
      <div>{hp}</div>
      <div>PlayerStats</div>
    </>
  );
};

export default Player;
