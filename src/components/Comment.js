import React from 'react'
import PropTypes from 'prop-types'

const Comment2 = ({ comment }) => {

  return (
    <article>
      <p>{comment.body}</p>
      <p>Author: {comment.author}</p>
      <p>{comment.voteScore} votes</p>
      <hr />
    </article>
  )
}

Comment2.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default Comment2