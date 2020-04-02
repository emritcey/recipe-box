import React, { useContext } from 'react';
import AppContext from '../../../../../Context/app-context';


export default (props) => {
  const context = useContext(AppContext);

  return (
    <div className="mikey-box mikey-blank-box"
      onClick={() => {
          if (context.mikeyGameWin) { return };
          let dispatchObj;
          context.mikeyPlayer1 ? dispatchObj = { index: props.keyIndex, xClicked: true } : dispatchObj = { index: props.keyIndex, xClicked: false };
          context.mikeySetXBlock(dispatchObj);
        }}
    >
      <h3>*</h3>
    </div>
  );
};