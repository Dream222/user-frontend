import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import Navigation from '../../../containers/Navigation'
import OverviewSection from './OverviewSection'
import BookingSection from '../containers/BookingSectionContainer'
import DetailsSection from './DetailsSection'
import NotLogged from '../../../containers/Modals/NotLogged'
import Payment from '../../../containers/Modals/Payment'
import Success from '../../../containers/Modals/Success'


class VenueView extends Component {
  componentDidMount() {
    const { getSportNames, loadVenue, pathName } = this.props

    loadVenue(pathName)
    getSportNames()
  }

  renderViews() {
    const { venue } = this.props

    if (venue) {
      return (
        <div>
          <OverviewSection venue={venue} />
          <BookingSection venue={venue} />
          <DetailsSection venue={venue} />
          <Payment venue={venue} />
        </div>
      )
    }

    return (
      <div style={{ marginTop: '200px', paddingBottom: '1000px' }}>
        <FontAwesome
          className="color-primary-brand"
          name="refresh"
          spin={true}
          stack="2x" />
      </div>
    )
  }

  render() {
    return (
      <div>
        <header>
          <Navigation theme="light" />
        </header>
        <main>
          {this.renderViews()}
        </main>
        <NotLogged />
        <Success />
      </div>
    )
  }
}

VenueView.propTypes = {
  getSportNames: PropTypes.func.isRequired,
  loadVenue: PropTypes.func.isRequired,
  pathName: PropTypes.string,
  venue: PropTypes.object
}


export default VenueView
