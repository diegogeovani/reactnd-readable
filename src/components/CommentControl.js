import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  comment as commentModel,
  post as postModel,
} from '../model'
import { deleteComment } from '../state/actions'

const CommentControl = ({
  comment,
  onEdit,
  onDelete,
  post,
}) => (
    <section>
      <button type='button' onClick={() => onEdit && onEdit(comment)}>edit</button>
      <button type='button' onClick={() =>
        onDelete(
          postModel(post).updateCommentCount(-1),
          commentModel(comment).selfDelete()
        )
      }>
        delete
    </button>
    </section>
  )

CommentControl.propTypes = {
  comment: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  post: state.posts[ownProps.comment.parentId]
})

const mapDispatchToProps = (dispatch) => ({
  onDelete: (post, comment) => deleteComment(post, comment)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentControl)