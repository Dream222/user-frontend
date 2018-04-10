import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypeShapes from '../../../../components/PropTypes'
import Text from '../../../../containers/Text'

import AvailableCourtsRow from './AvailableCourtsRow'
import AvailableCourtsGrid from './AvailableCourtsGrid'


const renderLoadingSpinner = () =>
  <div className="ptm">
    <FontAwesome
      className="spinner color-turquoise"
      name="refresh"
      spin={true}
      stack="2x" />
  </div>

const renderNoAvailabilityMessage = () =>
  <div className="phm pbm">
    <div className="pvt t3"><Text text="modals.booking.error" /></div>
    <p className="pvt"><Text text="modals.booking.info_1" /></p>
    <p className="pvt"><Text text="modals.booking.info_2" /></p>
  </div>


class Availability extends Component {
  constructor(props) {
    super(props)

    this.renderAvailabilityView = this.renderAvailabilityView.bind(this)
  }

  renderAvailabilityView() {
    const { availabilityView, loading, selectedCourts, slots } = this.props
    if (loading) {
      return renderLoadingSpinner()
    }

    if (slots.length === 0) {
      return renderNoAvailabilityMessage()
    }

    if (availabilityView === 'grid') {
      return <AvailableCourtsGrid selectedCourts={selectedCourts} slots={slots} />
    }

    return (
      <div className="color-bdt-grey-500">
        {slots.map((slot, index) =>
          <AvailableCourtsRow key={index} selectedCourts={selectedCourts} slot={slot} />
        )}
      </div>
    )
  }

  render() {
    const { availabilityView, setAvailabilityView } = this.props

    const backgroundColor = availabilityView === 'compact' ? 'color-bg-grey-100' : null

    let compactClass = 'color-turquoise'
    let gridClass = 'color-grey-600'

    if (availabilityView === 'grid') {
      compactClass = 'color-grey-600'
      gridClass = 'color-turquoise'
    }

    return (
      <div className={backgroundColor} style={{ minHeight: '17.375rem' }}>
        <div className="flex-row">
          <h3 className="section-title flex mam">
            <Text text="modals.booking.search_results" />
          </h3>
          <div className="flex-row">
            <a className="mrs mvm" onClick={() => setAvailabilityView('compact')}>
              <i className={`icon-grid1 t2 ${compactClass}`} />
            </a>
            <a className="mrm mlt mvm" onClick={() => setAvailabilityView('grid')}>
              <i className={`icon-grid2 t2 ${gridClass}`} />
            </a>
          </div>
        </div>
        { this.renderAvailabilityView() }
      </div>
    )
  }
}

Availability.propTypes = {
  availabilityView: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  selectedCourts: PropTypes.arrayOf(PropTypeShapes.court),
  setAvailabilityView: PropTypes.func.isRequired,
  slots: PropTypes.arrayOf(PropTypes.shape)
}


export default Availability
