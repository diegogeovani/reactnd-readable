import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { post, newPost } from '../model'

import { createPost } from '../state/actions'
import '../styles/MainPage.css'

class MainPage extends Component {

  state = post

  saveState = (target) => {
    const newState = this.state
    newState[target.name] = target.value
    this.setState(newState)
  }

  onInput = (event) => this.saveState(event.target)

  onSubmit = (event) => {
    event.preventDefault()
    const post = newPost(serializeForm(event.target, { hash: true }))
    console.log(post)
    this.props.onSubmit(post)
  }

  render() {
    const state = this.state

    return (
      <div>
        <header><h2>New post</h2></header>
        <p>Describe the details below as much as possible</p>
        <form onSubmit={this.onSubmit} className="form-post">
          <input onChange={this.onInput} type="text" name="title" placeholder="Title" value={state.title} />
          <input onChange={this.onInput} type="text" name="author" placeholder="Author" value={state.author} />
          <select>
            <option key="placeholder" value="placeholder">Category</option>
          </select>
          <textarea onChange={this.onInput} placeholder="Body" name="body" value={state.body} />
          <button>Post</button>
        </form>
        <time>{new Date().toString()}</time>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (post) => createPost(post)(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(MainPage)