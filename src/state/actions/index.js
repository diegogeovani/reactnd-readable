import * as Api from '../../apis/readable'

export const CATEGORY_FETCH = 'CATEGORY_FETCH'
export const POST_FETCH = 'POST_FETCH'
export const POST_CREATE = 'POST_CREATE'
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