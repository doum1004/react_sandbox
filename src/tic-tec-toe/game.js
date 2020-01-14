import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
              value={this.props.squares[i]}
              onClick={() => this.props.onClick(i)} />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    const n = 3;
    this.state = {
      n: n,
      history: [{
        squares: Array(n*n).fill(null),
        sums: {
          rows: Array(n).fill(0),
          cols: Array(n).fill(0),
          diag: 0,
          anti_diag: 0,
        },
        xIsNext: true,
        winner: null
      }],
      stepNumber: 0
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    if (current.winner) return;

    const n = this.state.n;
    const add = current.xIsNext ? 1 : -1;

    const new_current = JSON.parse(JSON.stringify(current));
    new_current.squares[i] = add === 1 ? 'X' : 'O';
    new_current.xIsNext = !new_current.xIsNext;

    const row = Math.floor(i / n);
    const col = i % n;

    let sums = new_current.sums;
    sums.rows[row] += add;
    sums.cols[col] += add;

    if (row === col) {
      sums.diag += add;
    }
    if (row === n - 1 - col) {
      sums.anti_diag += add;
    }

    if (Math.abs(sums.rows[row] === n) || Math.abs(sums.cols[col] === n) ||
    Math.abs(sums.diag) === n || Math.abs(sums.anti_diag) === n) {
      new_current.winner = add === 1 ? 'X' : 'O';
    }

    this.setState({
      history: history.concat([
        new_current
      ]),
      stepNumber: history.length,
    });
    console.log(history.length);
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    
    const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (current.winner) {
      status = 'Winner: ' + current.winner;
    } else {
      status = 'Next paleyr: ' + (current.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
  
export default Game;