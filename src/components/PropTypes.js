import React from 'react'

const PropTypes = {
  court: React.PropTypes.shape({
    duration: React.PropTypes.number,
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    price: React.PropTypes.number,
    start_time: React.PropTypes.string
  })
}

export default PropTypes
