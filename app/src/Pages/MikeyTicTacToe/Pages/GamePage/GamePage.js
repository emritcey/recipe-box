import React, { useContext } from 'react';
import AppContext from '../../../../Context/app-context'
import BlankBlock from './Components/BlankBlock';
import BlockComponent from './Components/BlockComponent';
import WinComponet from './Components/WinComponent';
import TieGame from './Components/TieGame';

export default () => {
  const context = useContext(AppContext);

  return (
    <div className="mikey-home-box">
      { context.mikeyBlankBlock.map((element, index) => element ? <BlankBlock keyIndex={index} /> : <BlockComponent keyIndex={index} />) }
      { context.mikeyGameWin ? <WinComponet /> : null }
      { context.mikeyTieGame && context.mikeyGameWin === false ? <TieGame /> : null }
    </div>
  );
};