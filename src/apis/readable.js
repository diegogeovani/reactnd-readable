const api = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'Diego Santos'
}

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
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

export const updatePost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(getUpdatePayload(post))
  }).then(res => res.json())

export const updatePostVoteScore = (post, upVote) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(getUpdateVoteScorePayload(upVote))
  }).then(res => res.json())

const getUpdatePayload = ({ title, body }) => (
  { title, body }
)

const getUpdateVoteScorePayload = (upVote) => (
  { option: upVote ? 'upVote' : 'downVote' }
)