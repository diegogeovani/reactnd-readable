import * as Api from '../../apis/readable'

export const CATEGORY_FETCH = 'CATEGORY_FETCH'
export const POST_CREATE = 'POST_CREATE'
export const COMMENT_CREATE = 'COMMENT_CREATE'

export const fetchCategories = () => dispatch => (
  Api.getCategories()
    .then(categories => dispatch(fetchCategoriesAction(categories)))
    .catch(error => console.error(error))
)

function fetchCategoriesAction(categories) {
  const action = {}
  categories.forEach(c => action[c.name] = { name: c.name })
  return {
    type: CATEGORY_FETCH,
    categories: action
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