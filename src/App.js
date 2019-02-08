import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import Grades from './components/Grades';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <>
        <div>
          <Link to="/">Home </Link>
          <Link to="grades"> Dashboard</Link>
        </div>
        <Router>
          <Home path="/" />
          <Grades path="grades" />
        </Router>
      </>
    );
  }
}

export default App;
