import React, { useState }from 'react';
import logo from './logo.svg';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

import './App.css';

function App() {
  const [isLoading, setLoading] = useState(false);
  const [greeting, setGreeting] = useState('');
  const sayHello = async (event) => {
    event.preventDefault();
    let response = await fetch('/greeting?name=' + greeting);
    let body = await response.json();
    setGreeting(body.name);
    setLoading(false);
  }

  const updateName = event => {
    event.preventDefault();
    setGreeting(event.target.value);
    setLoading(false);
  }
    if (isLoading) {
      return;
    }
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
          <div className="App-intro">
              <input onChange={(event)=>updateName(event)} placeholder="Enter Your Name"></input>
              <button onClick={(event)=>sayHello(event)}>Please Click Me!</button>
              <h2>Hello {greeting}</h2>
          </div>
        </header>
      </div>
    );
}

export default App;
