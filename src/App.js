import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MainPage from './pages/MainPage'
import { fetchCategories } from './state/actions'
import './App.css'

class App extends Component {

  static propTypes = {
    onInit: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.onInit()
  }

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

function mapDispatchToProps(dispatch) {
  return {
    onInit: () => fetchCategories()(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(App)