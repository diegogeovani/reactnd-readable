import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { sorting } from '../model'
import Dropdown, { dropdownOption } from '../components/Dropdown'
import CategoryDropdown from '../components/CategoryDropdown'
import PostListItem from '../components/PostListItem'

class MainPage extends Component {

  static propTypes = {
    posts: PropTypes.array.isRequired,
    category: PropTypes.string,
    sorting: PropTypes.object,
  }

  sorting = sorting()

  render() {
    return (
      <div>
        <header>
          <h1>Readable</h1>

          <Route render={({ history }) => (
            <CategoryDropdown
              category={this.props.category}
              placeholder='All categories'
              onSelect={(event) => {
                history.push(`/${event.target.value}${history.location.search}`)
              }} />
          )} />

          <Route render={({ history }) => (
            <Dropdown
              name='sort'
              options={[
                dropdownOption(this.sorting.sortBy.timestamp, 'Most recent'),
                dropdownOption(this.sorting.sortBy.voteScore, 'Most popular'),
              ]}
              currentValue={this.props.sorting ? this.props.sorting.sort : null}
              placeholder='Sort by'
              onSelect={(event) => {
                event.target.value ?
                  history.push(`${history.location.pathname}?sort=${event.target.value}`) :
                  history.push(history.location.pathname)
              }} />
          )} />

        </header>
        <main>
          {this.props.posts.map(p =>
            <PostListItem
              key={p.id}
              post={p} />
          )}
          <Link to="/posts">+</Link>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  let posts = Object.values(state.posts).filter(p => !p.deleted)
  if (ownProps.category) {
    posts = posts.filter(o => o.category === ownProps.category)
  }
  if (ownProps.sorting) {
    posts = sorting().sort(posts, ownProps.sorting.sort).reverse()
  }
  return { posts }
}

export default connect(mapStateToProps, null)(MainPage)