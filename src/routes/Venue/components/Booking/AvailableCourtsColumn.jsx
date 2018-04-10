import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import PropTypeShapes from '../../../../components/PropTypes'
import moment from 'moment'

import CourtGridItem from '../../containers/Booking/CourtGridItemContainer'


class AvailableCourtsColumn extends Component {
  constructor(props) {
    super(props)

    this.renderGridCourts = this.renderGridCourts.bind(this)
  }

  getslot_time(time) {
    return moment(time, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')
  }

  renderGridCourts() {
    const { courts, duration, hourlyColumn, selectedCourts, hourlyGrid } = this.props

    const FORMAT = 'YYYY-MM-DD HH:mm:ss'
    const courtGridItems = []
    const slotLength = hourlyColumn ? 60 : 30

    let last
    let lastSelected

    courts.forEach(court => {
      const current = moment(court.slot_time, FORMAT)
      const expected = last ? _.cloneDeep(last).add(slotLength, 'minutes') : null
      const nextAvailable = lastSelected ? _.cloneDeep(lastSelected).add(duration, 'minutes') : null
      let slotLengthClass

      if (expected && expected.isBefore(current)) {
        courtGridItems.push(
          <CourtGridItem
            className={slotLengthClass}
            duration={duration}
            key={expected.format('HH:mm')}
            time={expected.format('HH:mm')}
            type="unavailable" />
        )
      }

      let type = 'available'

      if (nextAvailable && current.isBefore(nextAvailable)) {
        type = 'overlapping'
      } else if (court.taken) {
        type = 'booked'
      } else if (selectedCourts.some(selectedCourt => selectedCourt.id === court.court.id &&
          selectedCourt.start_time === current.format('HH:mm'))) {
        type = duration === 30 ? 'selected' : 'selected-overlapping'
        lastSelected = _.cloneDeep(current)
      }

      if (court.court.duration === 60 && !hourlyGrid) {
        slotLengthClass = 'grid-court-double'
      }

      court.start_time = current.format('HH:mm')

      courtGridItems.push(
        <CourtGridItem
          className={slotLengthClass}
          court={court.court}
          duration={duration}
          key={court.slot_time}
          time={this.getslot_time(court.slot_time)}
          type={type} />
      )

      last = _.cloneDeep(current)
    })

    return courtGridItems
  }

  render() {
    const { name, earliestTimeSlot, courts } = this.props
    const isLaterThenEarliest = moment(earliestTimeSlot, 'YYYY-MM-DD HH:mm:ss')
      .isBefore(moment(courts[0].slot_time, 'YYYY-MM-DD HH:mm:ss'))

    return (
      <div className="color-bdh-white flex">
        <div className="grid-column-name">
          { name }
        </div>
        <div style={{ marginTop: `${isLaterThenEarliest ? 1.9375 : 0}rem` }}>
          { this.renderGridCourts() }
        </div>
      </div>
    )
  }
}

AvailableCourtsColumn.propTypes = {
  name: PropTypes.string.isRequired,
  earliestTimeSlot: PropTypes.string.isRequired,
  courts: PropTypes.arrayOf(
    PropTypes.shape({
      court: PropTypeShapes.court.isRequired,
      slot_time: PropTypes.string.isRequired,
      taken: PropTypes.bool.isRequired
    })
  ),
  hourlyColumn: PropTypes.bool.isRequired,
  hourlyGrid: PropTypes.bool.isRequired,
  selectedCourts: PropTypes.arrayOf(PropTypeShapes.court).isRequired,
  isHalfHourColumn: PropTypes.bool
}


export default AvailableCourtsColumn
