import * as Api from '../../apis/readable'

export const POST_CREATE = 'POST_CREATE'
export const COMMENT_CREATE = 'COMMENT_CREATE'

export const createPost = (post) => dispatch => (
  Api.create(post)
    .then(dispatch(createPostAction(post)))
    .catch(error => console.error(error))
)

export function createPostAction(post) {
  return {
    post,
    type: POST_CREATE
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