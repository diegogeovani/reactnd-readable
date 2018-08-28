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

  function updateCommentCount(commentCount) {
    return {
      ...this,
      commentCount,
    }
  }

  return {
    ...props(),
    props,
    create,
    updateCommentCount,
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

  const create = (parentId, author, body) => ({
    ...instance(),
    parentId,
    author,
    body,
  })

  return {
    ...instance(),
    create,
  }
}

export const vote = () => {

  const updateScore = (candidate = {}, vote = 0) => {
    const v = parseInt(vote, 10)
    return sorting().isRegularNumber(v) ?
      {
        ...candidate,
        voteScore: sorting().isRegularNumber(candidate.voteScore + v) ? candidate.voteScore + v : 0
      } :
      candidate
  }

  return {
    upValue: 1,
    downValue: -1,
    updateScore,
  }
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

  return {
    sortBy,
    sort,
    isRegularNumber,
  }
}