import * as Api from '../../apis/readable'

export const CATEGORY_FETCH = 'CATEGORY_FETCH'
export const POST_FETCH = 'POST_FETCH'
export const POST_CREATE = 'POST_CREATE'
export const POST_UPDATE = 'POST_UPDATE'
export const POST_UPDATE_VOTE_SCORE = 'POST_UPDATE_VOTE_SCORE'
export const COMMENT_CREATE = 'COMMENT_CREATE'

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

export const createPost = (post) => dispatch => (
  Api.createPost(post)
    .then(() => dispatch(createPostAction(post)))
    .catch(error => console.error(error))
)

function createPostAction(post) {
  return {
    type: POST_CREATE,
    post
  }
}

const getPostUpdatePayload = ({ id, title, body }) => {
  return {
    id,
    title,
    body
  }
}

export const updatePost = (post) => dispatch => (
  Api.updatePost(getPostUpdatePayload(post))
    .then(() => dispatch(updatePostAction(getPostUpdatePayload(post))))
    .catch(error => console.error(error))
)

function updatePostAction(post) {
  return {
    type: POST_UPDATE,
    post
  }
}

export const updatePostVoteScore = (post, upVote) => dispatch => (
  Api.updatePostVoteScore(post, upVote)
    .then(() => dispatch(updatePostVoteScoreAction(
      {
        id: post.id,
        voteScore: post.voteScore
      }
    )))
    .catch(error => console.error(error))
)

const updatePostVoteScoreAction = (post) => ({
  type: POST_UPDATE_VOTE_SCORE,
  post
})

export function createComment({ parentId, author, body, voteScore, deleted, parentDeleted }) {
  return {
    type: COMMENT_CREATE,
    parentId,
    author,
    body,
    voteScore,
    deleted,
    parentDeleted
  }
}