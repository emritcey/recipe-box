import React from 'react';
import {makeStyles} from "@material-ui/core/styles/index";
import clsx from 'clsx';


const useStyles = makeStyles(() => ({
    square: {
        border: '1px solid #999',
        float: 'left',
        height: '150px',
        width: '150px',
        padding: 0,
        'font-size': '24px',
        'font-weight': 'bold',
        'line-height': '34px',
        'margin-right': '-1px',
        'margin-top': '-1px',
        'text-align': 'center',
        "&:hover": {
            cursor: 'pointer',
        },
        "&:focus": {
            outline: 'none',
        },
    },
    filled: {
        "&:hover": {
            cursor: 'auto',
        },
    },
    empty: {
        "&:hover": {
            'background-color': '#5F5',
            transition: '0.5s',
            transform: 'scale(1.1)',
        },
    },
    winningSquare: {
        'background-color': '#5F5',
    }
}));

export default (props) => {
    const classes = useStyles();

    return (
        <button
            onClick={props.onClick}
            className={clsx(classes.square, {
                [classes.winningSquare]: props.winningSquare,
                [classes.empty]: !props.value && !props.gameOver,
                [classes.filled]: props.value,
            })}>
            {props.value}
        </button>
    );
}