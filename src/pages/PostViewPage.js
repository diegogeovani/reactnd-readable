import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { post as postModel } from '../model'
import { comment } from '../model'
import {
  fetchComments,
  createComment,
  updateComment
} from '../state/actions'
import PostVoteControl from '../components/PostVoteControl'
import PostControl from '../components/PostControl'
import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'

const getInitialState = () => ({
  commentForm: {
    id: undefined,
    author: '',
    body: '',
    edition: false,
  }
})

class PostViewPage extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    onCommentsInit: PropTypes.func.isRequired,
    onComment: PropTypes.func.isRequired,
    onCommentEdit: PropTypes.func.isRequired,
    comments: PropTypes.array,
  }

  state = getInitialState()

  componentDidMount() {
    this.verifyComments()
  }

  componentDidUpdate() {
    this.verifyComments()
  }

  onCommentFormSubmit = (e) => {
    e.preventDefault()
    const { post, onComment } = this.props
    const { commentForm } = this.state
    onComment(
      postModel(post).updateCommentCount(1),
      comment().create(post.id, commentForm.author, commentForm.body)
    )
  }

  onCommentFormEdit = (e) => {
    e.preventDefault()
    const { onCommentEdit } = this.props
    onCommentEdit(comment(this.state.commentForm))
  }

  verifyComments = () => {
    const { post, onCommentsInit, comments } = this.props
    !comments && post && post.commentCount > 0 && onCommentsInit(post)
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
            <br />
            <hr />
            <h3>Comments</h3>
            <CommentForm
              comment={this.state.commentForm}
              edition={this.state.commentForm.edition}
              onAuthorInput={(e) => this.setState({
                commentForm: {
                  ...this.state.commentForm,
                  author: e.target.value
                }
              })}
              onBodyInput={(e) => this.setState({
                commentForm: {
                  ...this.state.commentForm,
                  body: e.target.value
                }
              })}
              onSubmit={(e) => {
                if (this.state.commentForm.edition) {
                  this.onCommentFormEdit(e)
                } else {
                  this.onCommentFormSubmit(e)
                }
                this.setState(getInitialState())
              }}
              onEditCancel={(e) => {
                e.preventDefault()
                this.setState(getInitialState())
              }} />
          </article>
          <section>
            {comments ?
              <ul>
                {comments.map(c =>
                  <li key={c.id}>
                    <Comment
                      comment={c}
                      onEdit={(c) => this.setState({
                        commentForm: {
                          id: c.id,
                          author: c.author,
                          body: c.body,
                          edition: true
                        }
                      })} />
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
  onComment: (post, comment) => createComment(post, comment)(dispatch),
  onCommentEdit: (comment) => updateComment(comment)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PostViewPage)