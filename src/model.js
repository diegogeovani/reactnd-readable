import { uuid } from './utils/id'

export const post = {
  id: '',
  category: '',
  timestamp: '',
  title: '',
  author: '',
  body: '',
  voteScore: 0,
  commentCount: 0,
  deleted: false
}

export const newPost = (payload, id) => {
  return {
    ...post,
    ...payload,
    id: id !== null ? id : uuid(),
    timestamp: Date.now(),
  }
}