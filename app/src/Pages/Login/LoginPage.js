import React, { useContext } from 'react';
import LoginComponent from './Components/LoginComponent';
import SignUpComponent from './Components/SignUpComponent';
import AppContext from '../../context/app-context';

export default () => {
  const context = useContext(AppContext);
  return (
    <div className="login-page-container">
      {context.displaySignUp ? <SignUpComponent /> : <LoginComponent />}
      <img alt="Purple Squirrel" />
    </div>
  );
};