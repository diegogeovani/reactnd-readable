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
      const { post: p1 } = action
      return {
        ...state,
        [p1.id]: {
          ...p1
        }
      }

    case Action.POST_UPDATE:
      const { post: p2 } = action
      return {
        ...state,
        [p2.id]: {
          ...state[p2.id],
          title: p2.title,
          body: p2.body
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