import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import PropTypeShapes from '../../../../components/PropTypes'

// TODO (m.sorja) Is this useless?
const CourtGridItemContainer = (className, children, onClick) =>
  <div
    className={`grid-court ${className} t5 phm pvt flex-row flex-hc flex-vc`}
    onClick={onClick}>
    {!children || children}
  </div>

CourtGridItemContainer.propTypes = {
  className: PropTypes.string,
  children: React.PropTypes.arrayOf(React.PropTypes.element),
  onClick: PropTypes.func
}


class CourtGridItem extends Component {
  render() {
    const { className, court, onCourtSelect, time, type } = this.props

    if (type === 'booked') {
      return (
        <div className={`grid-court grid-court-booked ${className}`}>
          <div>Booked</div>
        </div>
      )
    }

    if (type === 'unavailable') {
      return (
        <div className={`grid-court grid-court-${type} ${className}`} />
      )
    }

    if (type === 'overlapping') {
      return (
        null
      )
    }

    court.start_time = moment(time, 'HH:mm').format('HH:mm')
    const endTime = moment(time, 'HH:mm').add(court.duration, 'minutes').format('HH:mm')

    return (
      <div
        className={`grid-court grid-court-${type} ${className}`}
        onClick={() => onCourtSelect(court)}>
        <div>
          <div className="time">
            <div>{time}</div>
            <div className="hyphen">-</div>
            <div>{endTime}</div>
          </div>
        </div>
      </div>
    )
  }
}

CourtGridItem.propTypes = {
  className: PropTypes.string,
  court: PropTypeShapes.court,
  duration: PropTypes.number,
  onCourtSelect: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}


export default CourtGridItem
