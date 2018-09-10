import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Switch,
  Route,
  withRouter,
} from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'

import { fetchAll } from '../state/actions'
import MainPage from '../pages/MainPage'
import PostPage from '../pages/PostPage'
import PostViewPage from '../pages/PostViewPage'
import NotFoundPage from '../pages/NotFoundPage'

import '../styles/App.css'

class App extends Component {

  static propTypes = {
    onInit: PropTypes.func.isRequired,
    categories: PropTypes.array,
    posts: PropTypes.array,
  }

  componentDidMount() {
    this.props.onInit()
  }

  parseSorting = (props) => (
    props.location.search ? queryString.parse(props.location.search) : null
  )

  render() {
    const { categories, posts } = this.props

    return (
      <div className="app">
        <Switch>
          <Route
            exact path="/"
            render={(props) => (
              <MainPage sorting={this.parseSorting(props)} />
            )} />

          <Route
            exact path="/posts"
            render={() => (<PostPage />)} />

          <Route
            exact path="/:path"
            render={(props) => (
              categories && !!categories.find(c => c === props.match.params.path) ?
                <MainPage
                  category={props.match.params.path}
                  sorting={this.parseSorting(props)} /> :
                <NotFoundPage />
            )} />

          <Route
            path="/posts/:id/edit"
            render={(props) => (
              posts && !!posts.find(p => p.id === props.match.params.id) ?
                <PostPage
                  id={props.match.params.id} /> :
                <NotFoundPage />
            )} />

          <Route
            exact path='/:category/:post_id'
            render={(props) => (
              categories &&
                posts &&
                !!categories.find(c => c === props.match.params.category) &&
                !!posts.find(p => p.id === props.match.params.post_id) ?
                < PostViewPage id={props.match.params.post_id} /> :
                <NotFoundPage />
            )} />

          <Route component={NotFoundPage} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: Object.keys(state.categories),
  posts: Object.values(state.posts).filter(p => !p.deleted)
})

const mapDispatchToProps = (dispatch) => ({
  onInit: () => fetchAll()(dispatch)
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
)