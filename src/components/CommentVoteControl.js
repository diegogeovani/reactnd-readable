import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { vote } from '../model'
import { updateCommentVoteScore } from '../state/actions'
import VoteControl from './VoteControl'

const CommentVoteControl = ({ comment, onVote }) => {

  const onVoteClick = (e) => {
    e.preventDefault()
    const voteValue = parseInt(e.target.value, 10)
    onVote(
      vote().updateScore(comment, e.target.value),
      voteValue === vote().upValue
    )
  }

  return (
    <VoteControl
      score={comment.voteScore}
      onVote={onVoteClick} />
  )
}

CommentVoteControl.propTypes = {
  comment: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    onVote: (comment, upVote) => updateCommentVoteScore(comment, upVote)(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(CommentVoteControl)