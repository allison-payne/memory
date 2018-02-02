import _ from 'lodash';
import React from 'react';
import Board from './board/board';
import GameInfo from './game-info/game-info';

const alphabet = ['A', 'B', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'M', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class SquareModel {
    constructor(value = null, onclick = null, matched = false, flip = false) {
        this.value = value;
        this.flip = flip;
        this.onClick = onclick;
        this.matched = matched;
    }
}

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        const randLetters = _.sampleSize(alphabet, 8);
        const initialSeed = randLetters.concat(randLetters);
        const squares = new Array();
        for (let index in initialSeed) {
            if (initialSeed.hasOwnProperty(index)) {
                squares.push(new SquareModel(initialSeed[index], (ind) => this.handleClick(ind)));
            }
        }
        this.initial_board = _.shuffle(squares);
        this.state = {
            history: [{
                squares: this.initial_board.map(a => ({...a})),
            }],
            stepNumber: 0,
            currentlySelected: [],
        };
    }

    handleClick(i) {
        const cur_history = this.state.history.slice(0, this.state.stepNumber + 1).map(a => ({...a}));
        const currentlySelected = this.state.currentlySelected.slice();
        const current = cur_history[cur_history.length - 1];
        const squares = current.squares.map(a => ({...a}));
        const clickedSquare = squares[i];
        if (currentlySelected.length == 2) {
            return;
        }
        clickedSquare.flip = !clickedSquare.flip;
        currentlySelected.push(i);
        cur_history.push({
            squares: squares,
        });
        this.setState({
            history: cur_history,
            stepNumber: cur_history.length - 1,
            currentlySelected: currentlySelected,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
        });
    }

    clearHistory() {
        this.setState({
            history: [{squares: _.shuffle(this.initial_board.map(a => ({...a})))}],
            stepNumber: 0,
        });
    }

    componentDidUpdate() {
        const cur_history = this.state.history.slice(0, this.state.stepNumber + 1).map(a => ({...a}));
        const squares = cur_history[cur_history.length - 1].squares;
        const currentlySelected = this.state.currentlySelected.slice();
        const square_one = squares[currentlySelected[0]];
        const square_two = squares[currentlySelected[1]];
        if (currentlySelected.length == 2) {
            //Check if matches
            if (square_one.value === square_two.value) {
                square_one.matched = true;
                square_two.matched = true;
            } else {
                square_one.flip = false;
                square_two.flip = false;
            }
            const selected = [];
            this.setState({
                history: cur_history,
                currentlySelected: selected,
            });
        }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return move ? (
                <li key={move}>
                    <button className="button button-clear" onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            ) : '';
        });
        let status;
        const winner = false;
        if (winner) {
            status = {
                text: 'Winner: ' + winner,
                winner: true
            }
        } else {
            status = {
                text: 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'),
                winner: false,
            }
        }

        return (
            <div className="container game">
                <div className="row">
                    <Board
                        squares={current.squares}
                        /*onClick={(i) => this.handleClick(i)}*/
                    />
                    <GameInfo status={status}
                              moves={moves}
                              stepNumber={this.state.stepNumber}
                              onClick={() => this.clearHistory()}
                    />
                </div>
            </div>
        );
    }
}