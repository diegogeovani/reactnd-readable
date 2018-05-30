export const POST_CREATE = 'POST_CREATE'

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