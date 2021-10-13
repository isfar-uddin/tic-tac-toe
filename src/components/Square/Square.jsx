import React from "react";
import styles from "./square.module.scss";

const Square = ({ value, onClick, isWinnerSelected }) => {
  return (
    <button
      className={`${styles.square} ${
        isWinnerSelected && styles.winnerSelected
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
