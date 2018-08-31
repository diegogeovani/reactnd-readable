import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CommentForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  render() {
    const { onSubmit } = this.props

    return (
      <form onSubmit={onSubmit}>
        <input type='author' name='author' placeholder='Author' />
        <textarea name='body' placeholder='Write your comment here' />
        <button>Comment</button>
      </form>
    )
  }

}

export default CommentForm