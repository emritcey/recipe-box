import React from 'react';
import logo from './logo.svg';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello World</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Fab color="secondary" aria-label="edit">
            <EditIcon />
        </Fab>
      </header>
    </div>
  );
}

export default App;
