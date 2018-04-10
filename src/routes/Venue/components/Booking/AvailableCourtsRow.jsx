import React, { Component } from 'react'
import moment from 'moment'

import CourtsCarousel from './CourtsCarousel'
import CourtButton from '../../containers/Booking/CourtButtonContainer'
import PropTypes from '../../../../components/PropTypes'
import Price from '../../../../components/Price'
import utils from '../../../../utils'


class AvailableCourtsRow extends Component {
  courtSelected(court) {
    const { selectedCourts } = this.props

    return selectedCourts.some(selectedCourt => selectedCourt === court)
  }

  render() {
    const { slot, selectedCourts } = this.props
    const start_time = moment(slot.slot_time, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')
    const remainingCourts = slot.available_courts.filter(court =>
      !selectedCourts.some(selected => selected.id === court.id &&
        utils.time.isInside(
          [selected.start_time, utils.time.addToTime(selected.start_time, selected.duration)],
          court.start_time
        )
      ) ||
      slot.taken_courts.some(taken => taken.id === court.id &&
        utils.time.collapses(
          [taken.start_time, taken.endTime],
          [start_time, utils.time.addToTime(start_time, slot.duration)]
        )
      )
    )

    return (
      <div className="available-courts-row flex-row flex-col-mobile color-bdb-grey-500">
        <div className="flex-row flex-hc flex-vc pas hide-mobile">
          <Price amount={slot.lowest_price} currency="€" theme="pale-turquoise" />
        </div>
        <div className="time-slot flex-row flex-hc pts-mobile">
          <div className="time mlm mls-mobile">{ start_time }</div>
        </div>
        <div className="flex flex-row flex-vc phs pht-mobile pvs-mobile">
          <CourtsCarousel>
            {remainingCourts.map((court, index) => {
              court.start_time = start_time

              return (
                <div key={index}>
                  <CourtButton
                    className={`${this.courtSelected(court) ? 'not-selectable' : ''}`}
                    court={court}
                    duration={court.duration}
                    selected={this.courtSelected(court)} />
                </div>
              )
            })}
          </CourtsCarousel>
        </div>
      </div>
    )
  }
}

AvailableCourtsRow.propTypes = {
  selectedCourts: React.PropTypes.arrayOf(PropTypes.court),
  slot: React.PropTypes.shape({
    available_courts: React.PropTypes.arrayOf(PropTypes.court),
    duration: React.PropTypes.number,
    lowest_price: React.PropTypes.number,
    slot_time: React.PropTypes.string
  })
}


export default AvailableCourtsRow
