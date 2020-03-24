import React, { useState } from 'react';
import LoginComponent from './Components/LoginComponent';
import SignUpComponent from './Components/SignUpComponent';

export default function LoginPage() {
  const [displaySignUp, setDisplaySignUp] = useState(false);

  return (
    <div className="login-page-container">
      { displaySignUp ? <SignUpComponent displaySignUp={displaySignUp} setDisplaySignUp={setDisplaySignUp} /> : <LoginComponent displaySignUp={displaySignUp} setDisplaySignUp={setDisplaySignUp} /> }
      <img alt="Purple Squirrel" />
    </div>
  );
};