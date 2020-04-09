import React, { useContext } from 'react';

import './MikeyApp.css';

import '../../../../App.css';
import GamePage from '../GamePage/GamePage';
import StartPage from '../StartPage/StartPage';
import AppContext from '../../../../Context/app-context';
import { createStyles, makeStyles } from "@material-ui/core/styles/index";

const useStyles = makeStyles(() =>
    createStyles({
        mikeyApp: {
            'margin-top': '75px',
            'text-align': 'center',
        },
    }),
);

export default () => {
  const context = useContext(AppContext);

  const classes = useStyles();

  return (
    <div className={classes.mikeyApp} >
      { context.mikeyGameStart ? <StartPage /> : <GamePage /> }
    </div>
  );
};