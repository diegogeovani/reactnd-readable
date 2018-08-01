import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MainPage from '../pages/MainPage'
import PostPage from '../pages/PostPage'
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
          exact path="/:path"
          render={(props) => (props.match.params.path !== 'posts' ?
            <MainPage
              category={props.match.params.path} /> :
            <PostPage />
          )} />

        <Route
          path="/posts/:id/edit"
          render={(props) => (
            <PostPage
              id={props.match.params.id} />
          )} />
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    onInit: () => fetchAll()(dispatch)
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))