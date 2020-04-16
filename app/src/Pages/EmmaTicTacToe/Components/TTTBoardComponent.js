import React, { useState, useEffect }  from 'react';
import {makeStyles} from "@material-ui/core/styles/index";
import TTTSquareComponent from './TTTSquareComponent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
    boardRow: {
        "&:after": {
            clear: 'both',
            display: 'table',
        },
    },
    status: {
        'margin-bottom': '10px',
        'text-align': 'center',
    }
}));

export default () =>  {
    const classes = useStyles();

    const[status, setStatus] = useState('');
    const[squares, setSquares] = useState(Array(9).fill(null));
    const[xIsNext, setXIsNext] = useState(true);
    const[winner, setWinner] = useState(null);
    const[winningLine, setWinningLine] = useState(null);

    const renderSquare = (i) => {
        const isWinner = winningLine && winningLine.indexOf(i) > -1;

        return <TTTSquareComponent value={squares[i]}
                                   winningSquare={isWinner}
                                   gameOver={winningLine}
                                   onClick={() => handleClick(i)} />;
    };

    const restartGame = () => {
      setStatus('');
      setSquares(Array(9).fill(null));
      setXIsNext(true);
      setWinner(null);
      setXIsNext(true);
      setWinningLine(null);
    };

    const handleClick = (i) => {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const squaresCopy = [...squares];
        squaresCopy[i] = xIsNext ? 'X' : 'O';

        setSquares(squaresCopy);
        setXIsNext(!xIsNext);
    };

    const calculateWinner = (squares) => {
        let lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];

            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a], winningLine: lines[i]};
            }
        }
        return null;
    };

    const isTied = (squares) => {
        for (let square of squares) {
            if (square === null) {
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        const winnerInfo = calculateWinner(squares);
        if (winnerInfo) {
            setWinner(winnerInfo.winner);
            setWinningLine(winnerInfo.winningLine);
        }

        if (winner) {
            setStatus('Winner: ' + winner);
        } else if (isTied(squares)) {
            setStatus('Tie!');
        } else {
            setStatus('Next player: ' + (xIsNext ? 'X' : 'O'));
        }
    }, [squares, xIsNext, winner]);

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => {restartGame()}}>Restart Game</Button>
            <h1 className={classes.status}>{status}</h1>
            <div className={classes.boardRow}>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className={classes.boardRow}>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className={classes.boardRow}>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}