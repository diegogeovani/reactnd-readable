const api = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'Diego Geovani Andrade dos Santos'
}

export const create = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: post
  }).then(res => res.json())