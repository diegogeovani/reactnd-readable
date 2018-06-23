import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class MainPage extends Component {

  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        <header><h1>Readable</h1></header>
        <main>
          {this.props.posts.map(p =>
            <article key={p.id}>
              <p>
                <cite><b>{p.title}</b></cite> - by {p.author} --> {p.voteScore} votes
              </p>
              <p>
                {p.body.length > 80 ?
                  `${p.body.substring(0, 64)}...` : p.body
                }
              </p>
              <p>{p.commentCount} comments</p>
              <button type="button">Upvote</button>
              <button type="button">Downvote</button>
              <button type="button">Edit</button>
              <hr />
            </article>
          )}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: Object.values(state.posts)
  }
}

export default connect(mapStateToProps, null)(MainPage)