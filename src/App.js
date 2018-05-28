import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MainPage from './pages/MainPage'

class App extends Component {
  render() {
    return (
      <Route
        exact path="/"
        render={() => (<MainPage />)} />
    )
  }
}

export default App;
