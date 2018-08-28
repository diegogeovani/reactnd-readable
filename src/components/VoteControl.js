import React from 'react'
import PropTypes from 'prop-types'

import { vote } from '../model'

const VoteControl = ({ score, onVote }) => (
  <section style={{ border: '.5em solid transparent' }}>
    <p>Score: {score}</p>
    <button type='button' value={vote().upValue} onClick={onVote}>Upvote</button>
    <button type='button' value={vote().downValue} onClick={onVote}>Downvote</button>
  </section>
)

VoteControl.propTypes = {
  score: PropTypes.number.isRequired,
  onVote: PropTypes.func.isRequired,
}

export default VoteControl