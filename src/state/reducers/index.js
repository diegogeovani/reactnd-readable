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

    case Action.POST_UPDATE_VOTE_SCORE:
      const { post: p3 } = action
      return {
        ...state,
        [p3.id]: {
          ...state[p3.id],
          voteScore: p3.voteScore
        }
      }

    case Action.POST_UPDATE_COMMENT_COUNT:
      const { post: p4 } = action
      return {
        ...state,
        [p4.id]: {
          ...state[p4.id],
          commentCount: p4.commentCount
        }
      }

    case Action.POST_DELETE:
      const { post: p5 } = action
      return {
        ...state,
        [p5.id]: {
          ...state[p5.id],
          deleted: p5.deleted
        }
      }

    default:
      return state
  }
}

function comments(state = {}, action) {
  const { comment } = action

  switch (action.type) {
    case Action.COMMENT_CREATE:
      return {
        ...state,
        [comment.id]: {
          ...comment
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})