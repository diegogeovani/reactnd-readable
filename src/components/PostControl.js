import React from 'react'
import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { deletePost } from '../state/actions'

const PostControl = ({ post, onDelete }) => (
  <section>
    <Link to={`/posts/${post.id}/edit`}>Edit</Link>
    <Route render={() => (
      <button type="button" onClick={() => {
        onDelete(post)
      }}>
        delete
      </button>
    )} />
  </section>
)

PostControl.propTypes = {
  post: PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  onDelete: (post) => deletePost(post)(dispatch)
})

export default connect(null, mapDispatchToProps)(PostControl)