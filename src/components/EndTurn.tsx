type EndTurnProps = {
  click(): void;
  playerTurn: boolean;
};

const EndTurn = ({ click, playerTurn }: EndTurnProps) => {
  if (playerTurn) {
    return (
      <button onClick={() => click()} className="absolute right-2">
        End Turn
        {/* <span className="block text-sm">or press e</span> */}
      </button>
    );
  } else {
    return null;
  }
};

export default EndTurn;
