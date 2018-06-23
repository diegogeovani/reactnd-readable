import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MainPage from '../pages/MainPage'
import PostManagementPage from '../pages/PostManagementPage'
import { fetchAll } from '../state/actions'
import '../styles/App.css'

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
        <Route
          path="/posts"
          render={() => (<PostManagementPage />)} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInit: () => fetchAll()(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(App)