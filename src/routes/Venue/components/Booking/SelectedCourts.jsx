import React, { Component } from 'react'

import CourtButton from '../../containers/Booking/CourtButtonContainer'
import CourtsCarousel from './CourtsCarousel'
import PropTypes from '../../../../components/PropTypes'


class SelectedTimes extends Component {
  render() {
    const { selectedCourts } = this.props

    return (
      <CourtsCarousel>
        {selectedCourts.map((court, index) =>
          <div key={index}>
            <CourtButton
              className="selected-for-booking"
              court={court}
              selected={true} />
          </div>
        )}
      </CourtsCarousel>
    )
  }
}

SelectedTimes.propTypes = {
  selectedCourts: React.PropTypes.arrayOf(PropTypes.court)
}


export default SelectedTimes
