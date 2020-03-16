import React from 'react';
import { Link } from "react-router-dom";

function TestPage() {
  return (
    <div>
      <h1>Purple Squirrels</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/testpage">Test Page</Link>
          </li>
          <li>
            <Link to="/recipepage">Recipe Page</Link>
          </li>
        </ul>
      </nav>
      <h1>Test Page</h1>
    </div>
  );
};

export default TestPage;