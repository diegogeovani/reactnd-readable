import React, { Component } from 'react'
import { post } from '../model'
import '../styles/MainPage.css'

class MainPage extends Component {

  state = post

  saveState = (target) => {
    const newState = this.state
    newState[target.name] = target.value
    this.setState(newState)
  }

  onInput = (event) => this.saveState(event.target)

  postSubmit = (event) => {
    event.preventDefault()
  }

  render() {
    const state = this.state

    return (
      <div>
        <header><h2>New post</h2></header>
        <p>Describe the details below as much as possible</p>
        <form onSubmit={this.postSubmit} className="form-post">
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

export default MainPage