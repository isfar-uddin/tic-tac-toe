import React from "react";
import Square from "../Square/Square";
import styles from "./board.module.scss";

const Board = ({ isWinnerSelected = false, squares = [], onClick }) => {
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        isWinnerSelected={isWinnerSelected}
        onClick={() => onClick(i)}
      />
    );
  };

  return (
    <div>
      <div className={styles.boardRow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={styles.boardRow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={styles.boardRow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
