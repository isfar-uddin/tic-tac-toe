import React from "react";
import Board from "./components/Board/Board";
import { calculateWinner } from "./utils/calculateWinner";
import {
  setLocalStorageItem,
  getLocalStorageItem,
} from "./utils/localStorageManage";

import "./App.css";

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
    console.log("history: ", newHistory);
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

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  componentDidMount() {
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

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            isWinnerSelected={winner}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className={winner ? "winning-info" : ""}>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
