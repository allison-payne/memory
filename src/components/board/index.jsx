import React from 'react';
import Square from '../square';

export default class Board extends React.Component {
    renderSquare(i) {
        return <Square model={this.props.squares[i]}
            index={i} />;
    }
    render() {
        return (
            <div className="column">
                <div className="container board">
                    <div className="row board-row">
                        <div className="column">
                            {this.renderSquare(0)}
                        </div>
                        <div className="column">
                            {this.renderSquare(1)}
                        </div>
                        <div className="column">
                            {this.renderSquare(2)}
                        </div>
                        <div className="column">
                            {this.renderSquare(3)}
                        </div>
                    </div>
                    <div className="row board-row">
                        <div className="column">
                            {this.renderSquare(4)}
                        </div>
                        <div className="column">
                            {this.renderSquare(5)}
                        </div>
                        <div className="column">
                            {this.renderSquare(6)}
                        </div>
                        <div className="column">
                            {this.renderSquare(7)}
                        </div>
                    </div>
                    <div className="row board-row">
                        <div className="column">
                            {this.renderSquare(8)}
                        </div>
                        <div className="column">
                            {this.renderSquare(9)}
                        </div>
                        <div className="column">
                            {this.renderSquare(10)}
                        </div>
                        <div className="column">
                            {this.renderSquare(11)}
                        </div>
                    </div>
                    <div className="row board-row">
                        <div className="column">
                            {this.renderSquare(12)}
                        </div>
                        <div className="column">
                            {this.renderSquare(13)}
                        </div>
                        <div className="column">
                            {this.renderSquare(14)}
                        </div>
                        <div className="column">
                            {this.renderSquare(15)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}