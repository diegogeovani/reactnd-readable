import { combineReducers } from 'redux'
import { POST_CREATE, COMMENT_CREATE } from '../actions'
import { post } from '../../model'

const getInitialState = (post) => ({
  ...post,
  id: '123',
  timestamp: Date.now(),
})

const initialState = getInitialState(post);

function posts(state = initialState, action) {
  const { category, timestamp, title, author, body } = action

  switch (action.type) {
    case POST_CREATE:
      return {
        ...state,
        [timestamp]: {
          category,
          timestamp,
          title,
          author,
          body
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