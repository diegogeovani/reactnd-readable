import * as Api from '../../apis/readable'

export const CATEGORY_FETCH = 'CATEGORY_FETCH'
export const POST_FETCH = 'POST_FETCH'
export const POST_CREATE = 'POST_CREATE'
export const POST_UPDATE = 'POST_UPDATE'
export const POST_UPDATE_VOTE_SCORE = 'POST_UPDATE_VOTE_SCORE'
export const POST_UPDATE_COMMENT_COUNT = 'POST_UPDATE_COMMENT_COUNT'
export const POST_DELETE = 'POST_DELETE'
export const COMMENT_CREATE = 'COMMENT_CREATE'


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

export const createComment = (post, comment) => dispatch => (
  Api.createComment(comment)
    .then(() => {
      dispatch(createCommentAction(comment))
      dispatch(updatePostCommentCountAction(post))
    })
    .catch(error => console.error(error))
)