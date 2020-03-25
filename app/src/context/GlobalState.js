import React, { useReducer } from 'react';
import AppContext from './app-context';
import { appReducer, DISPLAY_SIGNUP } from './reducers';

const GlobalState = props => {
  const [appState, dispatch] = useReducer(appReducer, { displaySignUp: false });

  const setDisplaySignUp = displaySignUpBoolean => {
    dispatch({ type: DISPLAY_SIGNUP, displaySignUpBoolean: displaySignUpBoolean })
  };

  const globalStateObject = {
    displaySignUp: appState.displaySignUp,
    setDisplaySignUp: setDisplaySignUp
  };

  return (
    <AppContext.Provider value={ globalStateObject }>
      {props.children}
    </AppContext.Provider>
  );
};

export default GlobalState;
