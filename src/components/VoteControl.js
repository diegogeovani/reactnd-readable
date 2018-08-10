import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { vote } from '../model'
import { updatePostVoteScore } from '../state/actions'

const VoteControl = ({ post, onVote }) => {

  const onVoteClick = (e) => {
    e.preventDefault()
    const voteValue = parseInt(e.target.value, 10)
    onVote(
      {
        ...post,
        voteScore: post.voteScore + voteValue
      },
      voteValue === vote.upValue
    )
  }

  return (
    <section style={{ border: '.5em solid transparent', float: 'right' }}>
      <p>Score: {post.voteScore}</p>
      <button type='button' value={vote.upValue} onClick={onVoteClick}>Upvote</button>
      <button type='button' value={vote.downValue} onClick={onVoteClick}>Downvote</button>
    </section>
  )
}

VoteControl.propTypes = {
  post: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    onVote: (post, upVote) => updatePostVoteScore(post, upVote)(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(VoteControl)