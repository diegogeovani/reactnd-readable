import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'

import { post as postModel } from '../model'
import { comment } from '../model'
import VoteControl from '../components/VoteControl'
import PostControl from '../components/PostControl'
import { createComment } from '../state/actions'

const PostViewPage = ({ post, onComment }) => {

  const onFormSubmit = (e) => {
    e.preventDefault()
    const form = serializeForm(e.target, { hash: true })
    onComment(
      {
        ...post,
        commentCount: post.commentCount + 1
      },
      comment().post(post.id, form.author, form.body)
    )
  }

  return (
    <div>
      <header>
        <h2>{post.title}</h2>
        <p>by<cite>{post.author}</cite></p>
      </header>
      <main>
        <p>{post.body}</p>
        <p>Created at: {post.timestamp}</p>
        <p>{post.commentCount} comments</p>
        <VoteControl post={post} />
        <PostControl post={post} />
        <form className="form-post" onSubmit={onFormSubmit}>
          <input type='author' name='author' placeholder='Author' />
          <textarea name='body' placeholder='Write your comment here' />
          <button>Comment</button>
        </form>
      </main>
    </div>
  )
}

PostViewPage.propTypes = {
  id: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  onComment: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  post: state.posts[ownProps.id] ? state.posts[ownProps.id] : postModel
})

const mapDispatchToProps = (dispatch) => ({
  onComment: (post, comment) => createComment(post, comment)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PostViewPage)