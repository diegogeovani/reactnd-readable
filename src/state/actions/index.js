import { goBack } from 'connected-react-router'

import * as Api from '../../apis/readable'

export const CATEGORY_FETCH = 'CATEGORY_FETCH'
export const POST_FETCH = 'POST_FETCH'
export const POST_CREATE = 'POST_CREATE'
export const POST_UPDATE = 'POST_UPDATE'
export const POST_UPDATE_VOTE_SCORE = 'POST_UPDATE_VOTE_SCORE'
export const POST_UPDATE_COMMENT_COUNT = 'POST_UPDATE_COMMENT_COUNT'
export const POST_DELETE = 'POST_DELETE'
export const COMMENT_FETCH = 'COMMENT_FETCH'
export const COMMENT_CREATE = 'COMMENT_CREATE'
export const COMMENT_UPDATE_VOTE_SCORE = 'COMMENT_UPDATE_VOTE_SCORE'
export const COMMENT_UPDATE = 'COMMENT_UPDATE'
export const COMMENT_DELETE = 'COMMENT_DELETE'
export const COMMENT_DELETE_PARENT_BATCH = 'COMMENT_DELETE_PARENT_BATCH'

const fetchCategories = (categories) => ({
  type: CATEGORY_FETCH,
  categories: categories.reduce((accumulator, c) => {
    accumulator[c.name] = { name: c.name }
    return accumulator
  }, {})
})

const fetchPosts = (posts) => ({
  type: POST_FETCH,
  posts: posts.reduce((accumulator, p) => {
    accumulator[p.id] = p
    return accumulator
  }, {})
})

const createPostAction = (post) => ({
  type: POST_CREATE,
  post
})

const updatePostAction = ({ id, title, body }) => ({
  type: POST_UPDATE,
  post: {
    id,
    title,
    body,
  }
})

const updatePostVoteScoreAction = ({ id, voteScore }) => ({
  type: POST_UPDATE_VOTE_SCORE,
  post: {
    id,
    voteScore,
  }
})

const deletePostAction = ({ id, deleted }) => ({
  type: POST_DELETE,
  post: {
    id,
    deleted,
  }
})

const fetchCommentsAction = (comments) => ({
  type: COMMENT_FETCH,
  comments: comments.reduce((accumulator, c) => {
    accumulator[c.id] = c
    return accumulator
  }, {})
})

const createCommentAction = (comment) => ({
  type: COMMENT_CREATE,
  comment
})

const updatePostCommentCountAction = ({ id, commentCount }) => ({
  type: POST_UPDATE_COMMENT_COUNT,
  post: {
    id,
    commentCount,
  }
})

const updateCommentVoteScoreAction = ({ id, voteScore }) => ({
  type: COMMENT_UPDATE_VOTE_SCORE,
  comment: {
    id,
    voteScore,
  }
})

const updateCommentAction = ({ id, body }) => ({
  type: COMMENT_UPDATE,
  comment: {
    id,
    body,
  }
})

const deleteCommentAction = ({ id, deleted }) => ({
  type: COMMENT_DELETE,
  comment: {
    id,
    deleted,
  }
})

const deleteCommentParentBatchAction = (comments) => ({
  type: COMMENT_DELETE_PARENT_BATCH,
  comments: comments.reduce((accumulator, c) => {
    const { id, parentDeleted } = c
    accumulator[c.id] = {
      id,
      parentDeleted,
    }
    return accumulator
  }, {})
})

export const fetchAll = () => dispatch => (
  Api.getCategories()
    .then(categories => dispatch(fetchCategories(categories)))
    .then(
      () => Api.getPosts()
        .then(posts => dispatch(fetchPosts(posts)))
        .catch(error => console.error(error))
    )
    .catch(error => console.error(error))
)

export const createPost = (post) => dispatch => (
  Api.createPost(post)
    .then(() => {
      dispatch(createPostAction(post))
      dispatch(goBack())
    })
    .catch(error => console.error(error))
)

export const updatePost = (post) => dispatch => (
  Api.updatePost(post)
    .then(() => {
      dispatch(updatePostAction(post))
      dispatch(goBack())
    })
    .catch(error => console.error(error))
)

export const updatePostVoteScore = (post, upVote) => dispatch => (
  Api.updatePostVoteScore(post, upVote)
    .then(() => dispatch(updatePostVoteScoreAction(post)))
    .catch(error => console.error(error))
)

export const deletePost = (post, comments) => dispatch => (
  Api.deletePost(post)
    .then(() => {
      comments && dispatch(deleteCommentParentBatchAction(comments))
      dispatch(deletePostAction(post))
    })
    .catch(error => console.error(error))
)

export const fetchComments = (post) => dispatch => (
  Api.getComments(post.id)
    .then((comments) => dispatch(fetchCommentsAction(comments)))
    .catch(error => console.error(error))
)

export const createComment = (post, comment) => dispatch => (
  Api.createComment(comment)
    .then(() => {
      dispatch(createCommentAction(comment))
      dispatch(updatePostCommentCountAction(post))
    })
    .catch(error => console.error(error))
)

export const updateCommentVoteScore = (comment, upVote) => dispatch => (
  Api.updateCommentVoteScore(comment.id, upVote)
    .then(() => dispatch(updateCommentVoteScoreAction(comment)))
    .catch(error => console.error(error))
)

export const updateComment = (comment) => dispatch => (
  Api.updateComment(comment.id, comment.body)
    .then(() => dispatch(updateCommentAction(comment)))
    .catch(error => console.error(error))
)

export const deleteComment = (post, comment) => dispatch => (
  Api.deleteComment(comment.id)
    .then(() => {
      dispatch(updatePostCommentCountAction(post))
      dispatch(deleteCommentAction(comment))
    })
    .catch(error => console.error(error))
)