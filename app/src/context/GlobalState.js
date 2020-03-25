import React, { useReducer } from 'react';
import AppContext from './app-context';
import { appReducer, DISPLAY_SIGNUP, CURRENT_USERNAME} from './reducers';

const GlobalState = props => {
  const [appState, dispatch] = useReducer(appReducer, { displaySignUp: false, currentUserName: '' });

  const setDisplaySignUp = displaySignUpBoolean => {
    dispatch({ type: DISPLAY_SIGNUP, displaySignUpBoolean: displaySignUpBoolean })
  };

  const setCurrentUserName = currentUserNameValue => {
    dispatch({ type: CURRENT_USERNAME, currentUserNameValue: currentUserNameValue })
  }

  const globalStateObject = {
    displaySignUp: appState.displaySignUp,
    setDisplaySignUp: setDisplaySignUp,
    currentUserName:appState.currentUserName,
    setCurrentUserName: setCurrentUserName
  };

  return (
    <AppContext.Provider value={ globalStateObject }>
      {props.children}
    </AppContext.Provider>
  );
};

export default GlobalState;
