import { POST_CREATE } from '../actions'
import { post } from '../../model'

const getInitialState = (post) => ({
  ...post,
  id: '123',
  timestamp: Date.now(),
})

const initialState = getInitialState(post);

export function postReducer(state = initialState, action) {
  const { category, timestamp, title, author, body } = action

  switch (action.type) {
    case POST_CREATE:
      return {
        ...state,
        category,
        timestamp,
        title,
        author,
        body
      }
    default:
      return state
  }
}