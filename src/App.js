/* eslint-disable no-undef */
import React from 'react'

import './App.css'
import ReadSheet from './ReadSheet'
import AddToSheet from './AddToSheet'
import Login from './Login'

function App() {
  return (
    <div className='App'>
      <header>
        <h1>Hello Netlify functions</h1>
      </header>
      <main>
        <Login />
        <AddToSheet />
        <br />
        <ReadSheet />
      </main>
    </div>
  )
}

export default App
