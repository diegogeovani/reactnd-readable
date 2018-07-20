import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { vote } from '../model'
import { updatePostVoteScore } from '../state/actions'

const PostListItem = ({ post, onVote }) => {

  const onClick = (e) => {
    e.preventDefault()
    const voteValue = parseInt(e.target.value)
    onVote(
      {
        ...post,
        voteScore: post.voteScore + voteValue
      },
      voteValue === vote.upValue
    )
  }

  return (
    <article key={post.id}>
      <p>
        <cite><b>{post.title}</b></cite> - by {post.author}
      </p>
      <section style={{ border: '.5em solid transparent', float: 'right' }}>
        {post.voteScore} votes
        <button type='button' value={vote.upValue} onClick={onClick}>Upvote</button>
        <button type='button' value={vote.downValue} onClick={onClick}>Downvote</button>
      </section>
      <p>
        {post.body.length > 80 ?
          `${post.body.substring(0, 64)}...` : post.body
        }
      </p>
      <p>{post.commentCount} comments</p>
      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
      <button type="button">delete</button>
      <hr />
    </article>
  )
}

PostListItem.propTypes = {
  post: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    onVote: (post, upVote) => updatePostVoteScore(post, upVote)(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(PostListItem)