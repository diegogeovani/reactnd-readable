import React from 'react'
import PropTypes from 'prop-types'

export const dropdownOption = (value, text) => ({
  value,
  text
})

const Dropdown = ({
  name,
  options,
  onSelect,
  currentValue,
  placeholder,
}) => {

  const defaultValue = ''
  return (
    <select name={name} value={currentValue ? currentValue : defaultValue} onChange={onSelect}>
      {placeholder &&
        <option key={defaultValue} value={defaultValue}>{placeholder}</option>
      }
      {options.map(o => <option key={o.value} value={o.value}>{o.text}</option>)}
    </select>
  )
}

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  currentValue: PropTypes.string,
  placeholder: PropTypes.string,
}

export default Dropdown