import React from 'react'
import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { post as postModel, comment as commentModel } from '../model'
import { deletePost } from '../state/actions'

const PostControl = ({
  post,
  onDelete,
  comments,
}) => (
    <section>
      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
      <Route render={() => (
        <button type="button" onClick={() => {
          onDelete(
            postModel(post).selfDelete(),
            comments ? comments.map(c => commentModel(c).parentDelete()) : undefined
          )
        }}>
          delete
      </button>
      )} />
    </section>
  )

PostControl.propTypes = {
  post: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  comments: PropTypes.array,
}

const mapStateToProps = (state, ownProps) => {
  const post = ownProps.post
  let comments
  if (post.commentCount > 0) {
    comments = Object.values(state.comments)
      .filter(c => c.parentId === post.id)
      .filter(d => !d.deleted && !d.parentDeleted)
  }
  return {
    comments: comments && comments.length > 0 ? comments : undefined
  }
}

const mapDispatchToProps = (dispatch) => ({
  onDelete: (post, comments) => deletePost(post, comments)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PostControl)