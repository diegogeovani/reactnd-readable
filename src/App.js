import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route
          exact path="/"
          render={() => (<MainPage />)} />
      </div>
    )
  }
}

export default App;
