import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'

import MainPage from '../pages/MainPage'
import PostPage from '../pages/PostPage'
import PostViewPage from '../pages/PostViewPage'

import { fetchAll } from '../state/actions'

import '../styles/App.css'

class App extends Component {

  static propTypes = {
    onInit: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.onInit()
  }

  parseSorting = (props) => (
    props.location.search ? queryString.parse(props.location.search) : null
  )

  render() {
    return (
      <div className="app">
        <Route
          exact path="/"
          render={(props) => (
            <MainPage sorting={this.parseSorting(props)} />
          )} />

        <Route
          exact path="/:path"
          render={(props) => (props.match.params.path !== 'posts' ?
            <MainPage
              category={props.match.params.path}
              sorting={this.parseSorting(props)} /> :
            <PostPage />
          )} />

        <Route
          path="/posts/:id/edit"
          render={(props) => (
            <PostPage
              id={props.match.params.id} />
          )} />

        <Route
          exact path='/:category/:post_id'
          render={(props) => (
            <PostViewPage id={props.match.params.post_id} />
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