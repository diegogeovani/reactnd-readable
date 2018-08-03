import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dropdown from './Dropdown'

const CategoryDropdown = ({
  categories,
  onSelect,
  placeholder,
  category
}) => {

  return (
    <Dropdown
      name='category'
      options={categories}
      onSelect={onSelect}
      currentValue={category}
      placeholder={placeholder} />
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