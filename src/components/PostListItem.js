import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import PostVoteControl from './PostVoteControl'
import PostControl from './PostControl'

const PostListItem = ({ post }) => (
  <article key={post.id}>
    <p>
      <cite><b>{post.title}</b></cite> - by {post.author}
    </p>
    <PostVoteControl post={post} />
    <p>
      {post.body.length > 80 ?
        `${post.body.substring(0, 64)}...` : post.body
      }
    </p>
    <p>{post.commentCount} comments</p>
    <Link to={`/${post.category}/${post.id}`}>View</Link>
    <PostControl post={post} />
    <hr />
  </article>
)

PostListItem.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostListItem