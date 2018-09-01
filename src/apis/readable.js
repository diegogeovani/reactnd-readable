const api = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'Diego Santos',
  'Content-Type': 'application/json',
}

const getPostUpdatePayload = ({ title, body }) => ({
  title,
  body
})

const getUpdateVoteScorePayload = (upVote) => (
  { option: upVote ? 'upVote' : 'downVote' }
)

const getCommentCreatePayload = ({ id, timestamp, body, author, parentId }) => ({
  id,
  timestamp,
  body,
  author,
  parentId
})

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const createPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

export const updatePost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
    },
    body: JSON.stringify(getPostUpdatePayload(post))
  }).then(res => res.json())

export const updatePostVoteScore = (post, upVote) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: JSON.stringify(getUpdateVoteScorePayload(upVote))
  }).then(res => res.json())

export const deletePost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
    }
  }).then(res => res.json())

export const getComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

export const createComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: JSON.stringify(getCommentCreatePayload(comment))
  }).then(res => res.json())


export const updateCommentVoteScore = (commentId, upVote) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: JSON.stringify(getUpdateVoteScorePayload(upVote))
  }).then(res => res.json())

export const updateComment = (id, body) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
    },
    body: JSON.stringify({ body })
  }).then(res => res.json())

export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
    }
  }).then(res => res.json())