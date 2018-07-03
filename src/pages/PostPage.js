import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import serializeForm from 'form-serialize'
import * as Model from '../model'
import { createPost, updatePost } from '../state/actions'
import '../styles/MainPage.css'

class PostPage extends Component {

  static propTypes = {
    categories: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSubmitEdition: PropTypes.func.isRequired,
    id: PropTypes.string,
    post: PropTypes.object
  }

  onSubmit = (event) => {
    event.preventDefault()
    const post = Model.newPost(
      serializeForm(event.target, { hash: true }),
      this.props.post ? this.props.post.id : null
    )
    console.log(post)
    if (this.isEdition()) {
      this.props.onSubmitEdition(post)
    } else {
      this.props.onSubmit(post)
    }
  }

  isEdition = () => {
    return this.props.id && this.props.post
  }

  render() {
    const { categories } = this.props
    const post = this.isEdition() ? this.props.post : Model.post

    return (
      <div>
        <header>
          <h2>{this.isEdition() ? 'Edit post' : 'New post'}</h2>
          <p>Describe the details below as much as possible</p>
        </header>
        <main>
          <form onSubmit={this.onSubmit} className="form-post">
            <input type="text" name="title" placeholder="Title" defaultValue={post.title} />
            <input type="text" name="author" placeholder="Author" defaultValue={post.author} />
            <select name="category" value={this.isEdition ? post.category : 'placeholder'}>
              <option key="placeholder" value="placeholder">Select a category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <textarea placeholder="Body" name="body" defaultValue={post.body} />
            <button>Post</button>
          </form>
          <time>{new Date().toString()}</time>
        </main>
      </div>
    )
  }
}

function mapStateToProps({ categories, posts }, ownProps) {
  return {
    categories: Object.keys(categories),
    post: posts[ownProps.id]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (post) => createPost(post)(dispatch),
    onSubmitEdition: (post) => updatePost(post)(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)