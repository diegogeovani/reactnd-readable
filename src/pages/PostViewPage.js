import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'

import { post as postModel } from '../model'
import { comment } from '../model'
import { createComment, fetchComments } from '../state/actions'
import PostVoteControl from '../components/PostVoteControl'
import PostControl from '../components/PostControl'
import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'

class PostViewPage extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    onCommentsInit: PropTypes.func.isRequired,
    onComment: PropTypes.func.isRequired,
    comments: PropTypes.array,
  }

  componentDidMount() {
    this.verifyComments()
  }

  componentDidUpdate() {
    this.verifyComments()
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    const { post, onComment } = this.props
    const form = serializeForm(e.target, { hash: true })
    onComment(
      postModel(post).updateCommentCount(1),
      comment().create(post.id, form.author, form.body)
    )
  }

  render() {
    const { post, comments } = this.props
    return (
      <div>
        <header>
          <h2>{post.title}</h2>
          <p>by <cite>{post.author}</cite></p>
        </header>
        <main>
          <article>
            <p>{post.body}</p>
            <p>Created at: {post.timestamp}</p>
            <p>{post.commentCount} comments</p>
            <PostVoteControl post={post} />
            <PostControl post={post} />
            <CommentForm onSubmit={this.onFormSubmit} />
          </article>
          <section>
            {comments ?
              <ul>
                {comments.map(c =>
                  <li key={c.id}>
                    <Comment comment={c} />
                  </li>
                )}
              </ul>
              :
              <p>No comments in this post yet</p>
            }
          </section>
        </main>
      </div>
    )
  }

  verifyComments = () => {
    const { post, onCommentsInit, comments } = this.props
    !comments && post && post.commentCount > 0 && onCommentsInit(post)
  }
}

const mapStateToProps = (state, ownProps) => {
  const post = state.posts[ownProps.id] ? state.posts[ownProps.id] : postModel().props()
  let comments
  if (post.commentCount > 0) {
    comments = Object.values(state.comments)
      .filter(c => c.parentId === post.id)
      .filter(d => !d.deleted && !d.parentDeleted)
  }
  return {
    post,
    comments: comments && comments.length > 0 ? comments : undefined
  }
}

const mapDispatchToProps = (dispatch) => ({
  onCommentsInit: (post) => fetchComments(post)(dispatch),
  onComment: (post, comment) => createComment(post, comment)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PostViewPage)