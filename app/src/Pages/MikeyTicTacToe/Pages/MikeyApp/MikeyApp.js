import React, { useContext } from 'react';

import './MikeyApp.css';

import '../../../../App.css';
import GamePage from '../GamePage/GamePage';
import StartPage from '../StartPage/StartPage';
import AppContext from '../../../../Context/app-context';


export default () => {
  const context = useContext(AppContext);

  return (
    <div className="Mikey-App">
      { context.mikeyGameStart ? <StartPage /> : <GamePage /> }
    </div>
  );
};