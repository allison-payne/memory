import React from 'react';

export default function GameInfo(props) {
    return (
        <div className="column-10 column-offset-90 game-info">
            <h5 className={`status${props.status.winner ? ' winner' : ''}`}>{props.status.text}</h5>
            <button className="button button-clear" onClick={props.onClick}>Restart
            </button>
            {props.stepNumber !== 0 ? <ol>{props.moves}</ol> : ''}
        </div>
    );
}