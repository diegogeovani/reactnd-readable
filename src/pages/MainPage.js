import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PostListItem from '../components/PostListItem'

class MainPage extends Component {

  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        <header><h1>Readable</h1></header>
        <main>
          {this.props.posts.map(p =>
            <Link to={`/posts/${p.id}`}>
              <PostListItem
                post={p} />
            </Link>
          )}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: Object.values(state.posts)
  }
}

export default connect(mapStateToProps, null)(MainPage)