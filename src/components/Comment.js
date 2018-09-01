import React from 'react'
import PropTypes from 'prop-types'

import CommentControl from './CommentControl'
import CommentVoteControl from './CommentVoteControl'

const Comment = ({ comment, onEdit }) => {

  return (
    <article>
      <p>{comment.body}</p>
      <p>Author: {comment.author}</p>
      <CommentControl
        comment={comment}
        onEdit={onEdit} />
      <CommentVoteControl comment={comment} />
      <hr />
    </article>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
}

export default Comment