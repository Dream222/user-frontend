import React, { Component, PropTypes } from 'react'
import utils from '../../../utils'
import VenueCard from './VenueCard'
import Pagination from '../containers/Pagination'
import EditInformation from '../containers/EditInformationContainer'
import Fa from 'react-fontawesome'
import Text from '../../../containers/Text'
import SweetAlert from 'sweetalert-react'

class Content extends Component {
  componentDidMount() {
    this.props.getData( {content: {reservations: [] } })
  }

  renderElements = (content, props) => {
    const { filter, pageNumber, perPage, toggleAlert, isFetching } = props

    if (isFetching) {
      return (
        <Fa className="loading color-primary-brand mtl"
        name="refresh"
        spin={true}
        stack="2x" />)
    }

    var reservations = content.reservations || []

    switch (filter) {
      case 'future_memberships':
        reservations = reservations.filter((e) =>{ return e.isRecurring && e.isFuture })
        break;
      case 'reselling_memberships':
        reservations = reservations.filter((e) =>{ return e.isRecurring && e.isReselling })
        break;
      case 'past_memberships':
        reservations = reservations.filter((e) =>{ return e.isRecurring && new Date(e.end_time_iso8601) < new Date() })
        break;
      case 'resold_memberships':
        reservations = reservations.filter((e) =>{ return e.isResold })
        break;
      case 'future_reservations':
        reservations = reservations.filter((e) =>{ return !e.isRecurring && !e.isResold && new Date(e.start_time_iso8601) > new Date() })
        break;
      case 'past_reservations':
        reservations = reservations.filter((e) =>{ return !e.isRecurring && !e.isResold && new Date(e.end_time_iso8601) < new Date() })
        break;
    }

    const chunkifiedVenueCards = utils.chunkify(reservations, perPage)
    const currentPage = chunkifiedVenueCards[pageNumber]
    const maxPage = chunkifiedVenueCards.length - 1

    if (_.flatten(chunkifiedVenueCards).length === 0) {
      return <h3><Text text="pages.profile.no_results" /></h3>
    }

    return (
      <div>
        { currentPage.map((value, i) => <VenueCard data={value} key={i} cancel={toggleAlert}  resellReservation={this.props.resellReservation} />) }
        {chunkifiedVenueCards.length > 1 && <Pagination
          maxPage={maxPage}
          pageNumber={pageNumber}
          perPage={perPage}
          totalItems={reservations.length} />}
      </div>)
  }


  render() {
    const { active,
        content,
        update,
        userId,
        showAlert,
        toggleAlert,
        cancelReservation,
        reservationToCancel } = this.props

    switch (active) {
      case 'edit':
        return (
          <EditInformation onSubmit={credentials => {
            update(credentials, userId)
          }} />)
      default:
        return (
          <div className="max-width" style={{ minHeight: 400 }}>
            { this.renderElements(content, this.props) }
            <SweetAlert
              onCancel={toggleAlert}
              onConfirm={() => cancelReservation(reservationToCancel)}
              onEscapeKey={toggleAlert}
              show={showAlert}
              showCancelButton={true}
              title={Text.t('pages.profile.cancel_notification')} />
          </div>)
    }
  }
}

Content.propTypes = {
  active: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  pageNumber: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  content: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  showAlert: PropTypes.bool.isRequired,
  toggleAlert: PropTypes.func.isRequired,
  cancelReservation: PropTypes.func.isRequired,
  reservationToCancel: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default Content
