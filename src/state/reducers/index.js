import { combineReducers } from 'redux'
import { POST_CREATE, COMMENT_CREATE } from '../actions'

function posts(state = {}, action) {
  const { post } = action

  switch (action.type) {
    case POST_CREATE:
      return {
        ...state,
        [post.id]: {
          ...post
        }
      }
    default:
      return state
  }
}

function comments(state = {}, action) {
  const { parentId, timestamp, author, body } = action

  switch (action.type) {
    case COMMENT_CREATE:
      return {
        ...state,
        [timestamp]: {
          parentId,
          timestamp,
          author,
          body
        }
      }
    default:
      return state
  }
}

export default combineReducers({ posts, comments })