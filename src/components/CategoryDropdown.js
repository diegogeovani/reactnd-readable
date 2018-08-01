import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const CategoryDropdown = ({
  categories,
  onSelect,
  placeholder,
  category
}) => {

  const defaultValue = ''
  return (
    <select name="category" value={category} onChange={onSelect}>
      {placeholder &&
        <option key={defaultValue} value={defaultValue}>{placeholder}</option>
      }
      {categories.map(c => <option key={c} value={c}>{c}</option>)}
    </select>
  )
}

CategoryDropdown.propTypes = {
  categories: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  category: PropTypes.string
}

function mapStateToProps({ categories }) {
  return {
    categories: Object.keys(categories)
  }
}

export default connect(mapStateToProps, null)(CategoryDropdown)