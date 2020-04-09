import React, { useContext } from 'react';
import AppContext from '../../../../../Context/app-context';

export default () => {
  const context = useContext(AppContext);

  return (
    <div>
      <h3>Tie Game</h3>
      <button
        onClick={() => {
          context.mikeyResetState();
        }}
      >Start A New Game</button>
      <button
        onClick={() => {
          context.mikeyResetState();
          context.mikeySetStartGame(true);
        }}
      >End Game</button>
    </div>
  );
};