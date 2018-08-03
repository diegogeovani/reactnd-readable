import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import CategoryDropdown from '../components/CategoryDropdown'
import PostListItem from '../components/PostListItem'

class MainPage extends Component {

  static propTypes = {
    posts: PropTypes.array.isRequired,
    category: PropTypes.string
  }

  render() {
    return (
      <div>
        <header>
          <h1>Readable</h1>
          <Route render={({ history }) => (
            <CategoryDropdown
              onSelect={(event) => {
                history.push(`/${event.target.value}`)
              }}
              category={this.props.category}
              placeholder='All categories' />
          )} />
        </header>
        <main>
          {this.props.posts.map(p =>
            <PostListItem
              key={p.id}
              post={p} />
          )}
          <Link to="/posts">+</Link>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: ownProps.category ?
      Object.values(state.posts).filter(o => o.category === ownProps.category) :
      Object.values(state.posts)
  }
}

export default connect(mapStateToProps, null)(MainPage)