import { calculateWinner } from "./utility";
import React from "react";
import Board from "./Board";
import "./style.css";
export default class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: Math.random() * 10 > 5 ? true : false,
    };
  }

  handleClick(i) {
    const { history, stepNumber, xIsNext } = this.state;
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = [...current.squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    this.setState({
      history: newHistory.concat([
        {
          squares,
        },
      ]),
      stepNumber: newHistory.length,
      xIsNext: !xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const { history, stepNumber, xIsNext } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    console.log(history);
    const moves = history.length - 1;
    const buttons = moves ? (
      <div className="d-flex justify-content-evenly w-100 mt-4">
        <svg
          fill="none"
          viewBox="0 0 32 32"
          id="icon"
          xmlns="http://www.w3.org/2000/svg"
          stroke="aliceblue"
          onClick={() => this.jumpTo(0)}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g>
            <title>reset</title>
            <path d="M18,28A12,12,0,1,0,6,16v6.2L2.4,18.6,1,20l6,6,6-6-1.4-1.4L8,22.2V16H8A10,10,0,1,1,18,26Z"></path>
            <rect width="32" height="32"></rect>
          </g>
        </svg>
        <svg
          fill="none"
          viewBox="0 0 32 32"
          id="icon"
          xmlns="http://www.w3.org/2000/svg"
          stroke="aliceblue"
          className="ms-2"
          onClick={() => this.jumpTo(moves-1)}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g>
            <title>Undo Move</title>
            <path d="M27,8H6.83l3.58-3.59L9,3,3,9l6,6,1.41-1.41L6.83,10H27V26H7V19H5v7a2,2,0,0,0,2,2H27a2,2,0,0,0,2-2V10A2,2,0,0,0,27,8Z"></path>
            <rect width="32" height="32"></rect>
          </g>
        </svg>
      </div>
    ) : (
      ""
    );
    history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : "Reset";
      console.log(step);
      console.log(move);
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            className="btn btn-info mt-2"
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${xIsNext ? "X" : "O"}`;
    }

    return (
      <div className="game d-flex justify-content-center flex-column align-items-center mt-1">
        <div className="game-board mt-5 mb-5">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{buttons}</ol>
        </div>
      </div>
    );
  }
}
