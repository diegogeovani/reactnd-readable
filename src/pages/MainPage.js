import React, { Component } from 'react'
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
            <PostListItem
              key={p.id}
              post={p} />
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