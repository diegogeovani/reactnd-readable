import React, { Component } from 'react'
import PropTypes from 'prop-types'

const getInitialState = () => ({
  author: '',
  body: '',
})

class CommentForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  state = getInitialState()

  render() {
    const { onSubmit } = this.props
    const { author, body } = this.state

    return (
      <form onSubmit={(e) => {
        onSubmit(e)
        this.setState(getInitialState())
      }}>
        <input
          type='text'
          name='author'
          placeholder='Author'
          value={author}
          onChange={(e) => this.setState({ author: e.target.value })} />
        <textarea
          name='body'
          placeholder='Write your comment here'
          value={body}
          onChange={(e) => this.setState({ body: e.target.value })} />
        <button>Comment</button>
      </form>
    )
  }

}

export default CommentForm