import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { vote } from '../model'
import { updatePostVoteScore } from '../state/actions'
import VoteControl from './VoteControl'

const PostVoteControl = ({ post, onVote }) => {

  const onVoteClick = (e) => {
    e.preventDefault()
    const voteValue = parseInt(e.target.value, 10)
    onVote(
      vote().updateScore(post, e.target.value),
      voteValue === vote().upValue
    )
  }

  return (
    <VoteControl
      score={post.voteScore}
      onVote={onVoteClick} />
  )
}

PostVoteControl.propTypes = {
  post: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    onVote: (post, upVote) => updatePostVoteScore(post, upVote)(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(PostVoteControl)