import React, { useContext } from 'react';
import AppContext from '../../../../Context/app-context';

export default () => {
  const context = useContext(AppContext);

  return (
    <div>
      <h2>Lil Mikeys Tic Tac Toe</h2>
      <button
        onClick={() => {
          context.mikeySetStartGame(false)
        }}
      >Start Game</button>
    </div>
  );
};