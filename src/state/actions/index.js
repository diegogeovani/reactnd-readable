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
export const COMMENT_DELETE = 'COMMENT_DELETE'

function fetchCategories(categories) {
  const payload = {}
  categories.forEach(c => payload[c.name] = { name: c.name })
  return {
    type: CATEGORY_FETCH,
    categories: payload
  }
}

function fetchPosts(posts) {
  const payload = {}
  posts.forEach(p => payload[p.id] = { ...p })
  return {
    type: POST_FETCH,
    posts: payload
  }
}

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

const fetchCommentsAction = (comments) => {
  const payload = {}
  comments.forEach(c => payload[c.id] = c)
  return {
    type: COMMENT_FETCH,
    comments: payload
  }
}

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

const deleteCommentAction = ({ id, deleted }) => ({
  type: COMMENT_DELETE,
  comment: {
    id,
    deleted,
  }
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
    .then(() => dispatch(createPostAction(post)))
    .catch(error => console.error(error))
)

export const updatePost = (post) => dispatch => (
  Api.updatePost(post)
    .then(() => dispatch(updatePostAction(post)))
    .catch(error => console.error(error))
)

export const updatePostVoteScore = (post, upVote) => dispatch => (
  Api.updatePostVoteScore(post, upVote)
    .then(() => dispatch(updatePostVoteScoreAction(post)))
    .catch(error => console.error(error))
)

export const deletePost = (post) => dispatch => (
  Api.deletePost(post)
    .then(() => dispatch(deletePostAction(post)))
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

export const deleteComment = (post, comment) => dispatch => (
  Api.deleteComment(comment.id)
    .then(() => {
      dispatch(updatePostCommentCountAction(post))
      dispatch(deleteCommentAction(comment))
    })
    .catch(error => console.error(error))
)