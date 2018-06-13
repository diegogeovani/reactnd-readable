export const POST_CREATE = 'POST_CREATE'
export const COMMENT_CREATE = 'COMMENT_CREATE'

export function createPost({ category, timestamp, title, author, body }) {
  return {
    type: POST_CREATE,
    category,
    timestamp,
    title,
    author,
    body
  }
}

export function createComment({ parentId, timestamp, author, body, voteScore, deleted, parentDeleted }) {
  return {
    type: COMMENT_CREATE,
    parentId,
    timestamp,
    author,
    body,
    voteScore,
    deleted,
    parentDeleted
  }
}