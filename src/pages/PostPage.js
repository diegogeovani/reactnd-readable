import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PostForm from '../components/PostForm'
import '../styles/MainPage.css'

class PostPage extends Component {

  static propTypes = {
    id: PropTypes.string,
  }

  render() {
    return (
      <div>
        <header>
          <h2>{this.props.id ? 'Edit post' : 'New post'}</h2>
          <p>Describe the details below as much as possible</p>
        </header>
        <main>
          <PostForm
            id={this.props.id} />
          <time>{new Date().toString()}</time>
        </main>
      </div>
    )
  }
}

export default PostPage