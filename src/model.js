import { uuid } from './utils/id'

export const post = {
  id: null,
  category: null,
  timestamp: null,
  title: null,
  author: null,
  body: null,
  voteScore: 0,
  commentCount: 0,
  deleted: false
}

export const newPost = (payload) => {
  return {
    ...post,
    ...payload,
    id: uuid(),
    timestamp: Date.now(),
  }
}