import React from 'react';

import './App.css';
import CreateSheet from './CreateSheet'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Hello Netlify functions</h1>
      </header>
      <main>
        <CreateSheet />
      </main>
    </div>
  );
}

export default App;
