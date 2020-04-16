import React from 'react';
import TTTBoardComponent from './TTTBoardComponent';
import {makeStyles} from "@material-ui/core/styles/index";

const useStyles = makeStyles(() => ({
    game: {
        display: 'flex',
        'flex-direction': 'row',
    },
    gameBoard: {
        margin: 'auto',
        padding: '10%',
    },
    gameInfo: {
        'margin-left': '20px',
    },
}));

export default () => {
    const classes = useStyles();

    return (

        <div className={classes.game}>
            <div className={classes.gameBoard}>
                <TTTBoardComponent />
            </div>
        </div>
    );
}
