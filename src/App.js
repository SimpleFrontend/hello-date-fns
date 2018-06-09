import React from 'react';
import { DatePicker } from 'antd';

import Container from './Container';
import logo from './logo.svg';

const App = () => (
  <Container>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-titl">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <DatePicker />
    </div>
  </Container>
);

export default App;
