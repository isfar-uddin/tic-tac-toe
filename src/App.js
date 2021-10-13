import React from "react";
import Board from "./components/Board/Board";
import { calculateWinner } from "./utils/calculateWinner";
import {
  setLocalStorageItem,
  getLocalStorageItem,
} from "./utils/localStorageManage";

import styles from "./app.module.scss";

export default class App extends React.Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  };

  clearGameInfo() {
    localStorage.clear();

    const history = [
      {
        squares: Array(9).fill(null),
      },
    ];

    this.setState({
      history,
      stepNumber: 0,
      xIsNext: true,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    const newHistory = history.concat([
      {
        squares: squares,
      },
    ]);

    // Remember the steps after browser refresh
    setLocalStorageItem("history", newHistory);
    setLocalStorageItem("stepNumber", history.length);
    setLocalStorageItem("xIsNext", !this.state.xIsNext);

    this.setState((prevState) => ({
      history: newHistory,
      stepNumber: history.length,
      xIsNext: !prevState.xIsNext,
    }));
  }

  unload = (e) => {
    e.preventDefault();
    localStorage.clear();
  };

  componentDidMount() {
    window.addEventListener("beforeunload", this.unload);
    const existingHistory = getLocalStorageItem("history");
    const xIsNext = getLocalStorageItem("xIsNext");
    if (existingHistory || xIsNext) {
      this.setState({
        history: existingHistory,
        stepNumber: existingHistory.length - 1,
        xIsNext: xIsNext,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.unload);
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className={styles.appWrapper}>
        <div className={styles.game}>
          <div className={styles.gameBoard}>
            <Board
              isWinnerSelected={winner}
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div
            className={`${styles.gameInfo} ${winner && styles.winnerSelected}`}
          >
            {status}
            <div
              className={styles.clearBtn}
              onClick={() => this.clearGameInfo()}
            >
              Start Again
            </div>
          </div>
        </div>
      </div>
    );
  }
}
