import React from 'react'
import PropTypes from 'prop-types'

const CommentForm = ({
  comment,
  edition,
  onAuthorInput,
  onBodyInput,
  onSubmit,
  onEditCancel,
}) => (
    <form>
      <input
        type='text'
        name='author'
        placeholder='Author'
        value={comment.author}
        onChange={onAuthorInput}
        disabled={edition ? 'disabled' : undefined} />
      <textarea
        name='body'
        placeholder='Write your comment here'
        value={comment.body}
        onChange={onBodyInput} />
      {edition &&
        <button type='button' onClick={onEditCancel}>
          Cancel
        </button>
      }
      <button type='button' onClick={onSubmit}>
        {edition ? 'Edit' : 'Comment'}
      </button>
    </form>
  )

CommentForm.propTypes = {
  comment: PropTypes.object.isRequired,
  edition: PropTypes.bool,
  onAuthorInput: PropTypes.func,
  onBodyInput: PropTypes.func,
  onSubmit: PropTypes.func,
  onEditCancel: PropTypes.func,
}

CommentForm.defaultProps = {
  edition: false,
}

export default CommentForm