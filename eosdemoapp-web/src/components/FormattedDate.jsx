import React from 'react'

class FormattedDate extends React.Component {
  render() {
    const { value } = this.props
    return (
      <div>
        {value && (new Date(value)).toLocaleString()}
      </div>
    )
  }
}

export default FormattedDate
