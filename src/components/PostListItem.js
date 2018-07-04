import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const PostListItem = ({ post }) => (
  <article key={post.id}>
    <p>
      <cite><b>{post.title}</b></cite> - by {post.author} --> {post.voteScore} votes
    </p>
    <p>
      {post.body.length > 80 ?
        `${post.body.substring(0, 64)}...` : post.body
      }
    </p>
    <p>{post.commentCount} comments</p>
    <button type="button">Upvote</button>
    <button type="button">Downvote</button>
    <Link to={`/posts/${post.id}/edit`}>Edit</Link>
    <hr />
  </article>
)

PostListItem.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostListItem