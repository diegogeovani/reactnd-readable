import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const PostListItem = ({ post }) => (
  <article key={post.id}>
    <p>
      <cite><b>{post.title}</b></cite> - by {post.author}
    </p>
    <section style={{ border: '.5em solid transparent', float: 'right' }}>
      {post.voteScore} votes
      <button type="button">Upvote</button>
      <button type="button">Downvote</button>
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

PostListItem.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostListItem