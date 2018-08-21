import { uuid } from './utils/id'

export const post = ({
  id,
  timestamp,
  category = '',
  author = '',
  title = '',
  body = '',
  voteScore = 0,
  commentCount = 0,
  deleted = false } = {}) => {

  const props = () => ({
    id,
    timestamp,
    category,
    author,
    title,
    body,
    voteScore,
    commentCount,
    deleted,
  })

  const create = ({ category, author, title, body } = {}) => ({
    ...props(),
    id: uuid(),
    timestamp: Date.now(),
    category,
    author,
    title,
    body,
  })

  return {
    ...props(),
    create,
    props,
  }
}

export const comment = (props = {}) => {

  const instance = () => ({
    ...props,
    id: uuid(),
    timestamp: Date.now(),
    voteScore: 0,
    deleted: false,
    parentDeleted: false,
  })

  const post = (parentId, author, body) => ({
    ...instance(),
    parentId,
    author,
    body,
  })

  return {
    ...instance(),
    post,
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