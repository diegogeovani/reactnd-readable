import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as Model from '../model'
import { createPost, updatePost } from '../state/actions'
import '../styles/MainPage.css'

class PostForm extends Component {

  static propTypes = {
    categories: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSubmitEdition: PropTypes.func.isRequired,
    id: PropTypes.string,
    post: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      data: Model.post
    }
  }

  componentDidMount() {
    if (this.isEdition(this.props) && this.state.data.id === Model.post.id) {
      this.setState({ data: this.props.post })
    }
  }

  componentDidUpdate() {
    if (this.isEdition(this.props) && this.state.data.id === Model.post.id) {
      this.setState({ data: this.props.post })
    }
  }

  onInput = (event) => {
    const data = this.state.data
    data[event.target.name] = event.target.value
    this.setState({ data })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const post = this.state.data
    console.log(post)
    if (this.isEdition(this.props)) {
      this.props.onSubmitEdition(post)
    } else {
      this.props.onSubmit(Model.newPost(post))
    }
  }

  isEdition = (props) => {
    return props.id && props.post
  }

  render() {
    const { categories } = this.props
    const post = this.state.data

    return (
      <form onSubmit={this.onSubmit} className="form-post">
        <input type="text" name="title" placeholder="Title" value={post.title} onChange={this.onInput} />
        <input type="text" name="author" placeholder="Author" value={post.author} onChange={this.onInput} />
        <select name="category" value={this.isEdition(this.props) ? post.category : 'placeholder'} onChange={this.onInput}>
          <option key="placeholder" value="placeholder">Select a category</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <textarea placeholder="Body" name="body" value={post.body} onChange={this.onInput} />
        <button>Post</button>
      </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)