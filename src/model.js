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

  function updateCommentCount(value) {
    return {
      ...this,
      commentCount: this.commentCount + value
    }
  }

  function selfDelete() {
    return {
      ...this,
      deleted: true
    }
  }

  return {
    ...props(),
    props,
    create,
    updateCommentCount,
    selfDelete,
  }
}

export const comment = ({
  id,
  timestamp,
  parentId = '',
  author = '',
  body = '',
  voteScore = 0,
  deleted = false,
  parentDeleted = false,
} = {}) => {

  const props = () => ({
    id,
    timestamp,
    parentId,
    author,
    body,
    voteScore,
    deleted,
    parentDeleted,
  })

  const create = (parentId, author, body) => ({
    ...props(),
    id: uuid(),
    timestamp: Date.now(),
    parentId,
    author,
    body,
  })

  function selfDelete() {
    return {
      ...this,
      deleted: true
    }
  }

  function parentDelete() {
    return {
      ...this,
      parentDeleted: true
    }
  }

  return {
    ...props(),
    create,
    selfDelete,
    parentDelete,
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