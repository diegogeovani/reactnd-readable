import { combineReducers } from 'redux'
import * as Action from '../actions'

function categories(state = {}, action) {
  const { categories } = action

  switch (action.type) {
    case Action.CATEGORY_FETCH:
      return {
        ...state,
        ...categories
      }
    default:
      return state
  }
}

function posts(state = {}, action) {
  switch (action.type) {
    case Action.POST_FETCH:
      const { posts } = action
      return {
        ...state,
        ...posts
      }
    case Action.POST_CREATE:
      const { post } = action
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
    case Action.COMMENT_CREATE:
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

export default combineReducers(
  {
    categories,
    posts,
    comments
  }
)