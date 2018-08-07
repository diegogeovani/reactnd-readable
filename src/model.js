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

export const newPost = (payload) => {
  return {
    ...post,
    ...payload,
    id: uuid(),
    timestamp: Date.now(),
  }
}

export const vote = {
  upValue: 1,
  downValue: -1
}

export const sorting = () => {
  const sortBy = {
    timestamp: 'timestamp',
    voteScore: 'voteScore'
  }

  const isRegularNumber = (num) => typeof num === 'number' && isFinite(num)

  const sort = (posts, prop = sortBy.timestamp) => {
    return [...posts].sort((a, b) => {
      const u = a[prop]
      const v = b[prop]
      return isRegularNumber(u) && isRegularNumber(v) ? u - v : 0
    })
  }

  return { sortBy, sort }
}