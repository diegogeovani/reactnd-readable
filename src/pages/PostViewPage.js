import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { vote } from '../model'
import { updatePostVoteScore } from '../state/actions'

const PostViewPage = ({ post, onVote }) => {

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
    <div>
      <header>
        <h2>{post.title}</h2>
        <p>by<cite>{post.author}</cite></p>
      </header>
      <main>
        <p>{post.body}</p>
        <p>Created at: {post.timestamp}</p>
        <p>{post.commentCount} comments</p>
        <section style={{ border: '.5em solid transparent', float: 'right' }}>
          <p>Score: {post.voteScore} </p>
          <button type='button' value={vote.upValue} onClick={onVoteClick}>Upvote</button>
          <button type='button' value={vote.downValue} onClick={onVoteClick}>Downvote</button>
        </section>
      </main>
    </div>
  )
}

PostViewPage.propTypes = {
  id: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  post: state.posts[ownProps.id]
})

const mapDispatchToProps = (dispatch) => ({
  onVote: (post, upVote) => updatePostVoteScore(post, upVote)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PostViewPage)