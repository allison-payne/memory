import React from 'react';

export default function Square(props) {
    return (
        <div className="square-container">
            <div className={`square${props.model && props.model.flip ? ' flip' : ''}${props.model && props.model.matched ? ' matched' : ''}`}
                 onClick={props.model && !props.model.matched ? () => {props.model.onClick(props.index)} : () => {return;}}>
                <div className="side front">
                    --
                </div>
                <div className="side back">
                    {props.model && props.model.value ? props.model.value : 'No Play'}
                </div>
            </div>
        </div>
    );
}