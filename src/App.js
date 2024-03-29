import './styles.css';
import { useState } from 'react';

function Square({value, onSquareClick}){
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );

}
 function Board({xIsNext, squares, onPlay}) {
  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));
  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
    onPlay(nextSquares);

  }
  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = "Winner:" + winner;
  } else {
    status = "Next player:" + (xIsNext ? "X" : "O");
  }
  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
  {Array(3).fill(null).map((_, i) => (
    <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
  ))}
</div>
    <div className="board-row">
    {Array(3).fill(null).map((_, i) => (
    <Square key={i} value={squares[i+3]} onSquareClick={() => handleClick(i+3)} />
  ))}
    </div>
    <div className="board-row">
    {Array(3).fill(null).map((_, i) => (
    <Square key={i} value={squares[i+6]} onSquareClick={() => handleClick(i+6)} />
  ))}
    </div>
    </>
  );
}
function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'You are @ move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <>
      <li key={move}>
        <div onClick={() => jumpTo(move)}>{description}</div>
      </li>
      </>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
