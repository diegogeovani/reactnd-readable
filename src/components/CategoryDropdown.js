import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class CategoryDropdown extends Component {

  static propTypes = {
    categories: PropTypes.array.isRequired,
    onSelect: PropTypes.func,
    placeholder: PropTypes.string,
    category: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      category: props.category
    }
  }

  onSelection = (event) => {
    this.setState({ category: event.target.value })
    this.props.onSelect && this.props.onSelect(event)
  }

  render() {
    const { category } = this.state
    const { categories, placeholder } = this.props
    const defaultValue = ''

    return (
      <select name="category" value={category ? category : defaultValue} onChange={this.onSelection}>
        {placeholder &&
          <option key={defaultValue} value={defaultValue}>{placeholder}</option>
        }
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: Object.keys(categories)
  }
}

export default connect(mapStateToProps, null)(CategoryDropdown)