import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { post as postModel } from '../model'
import VoteControl from '../components/VoteControl'
import PostControl from '../components/PostControl'

const PostViewPage = ({ post }) => {

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
        <VoteControl post={post} />
        <PostControl post={post} />
      </main>
    </div>
  )
}

PostViewPage.propTypes = {
  id: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  post: state.posts[ownProps.id] ? state.posts[ownProps.id] : postModel
})

export default connect(mapStateToProps, null)(PostViewPage)