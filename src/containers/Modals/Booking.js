import { connect } from 'react-redux'
import { show } from 'redux-modal'
import Booking from '../../components/Modals/Booking/'
import { fetchSingleVenue } from '../../api/venue-api'

import {
  changeDate,
  toggleSportsList,
  changeSport,
  onSlotSelect,
  onCourtSelect,
  clearState,
  clearSelectedCourts
} from '../../actions/booking-actions'


const mapDispatchToProps = {
  openModal: show,
  changeDate,
  toggleSportsList,
  changeSport,
  onSlotSelect,
  onCourtSelect,
  fetchSingleVenue,
  clearState,
  clearSelectedCourts
}
const venueSelector = (venues, name) =>
  venues.filter(venue =>
    venue.venue_name === name)[0] || {}
const slotsSelector = (bookingSlotsModal, venue) => {
  // check if have data from single fetch venue
  if (Object.keys(bookingSlotsModal).length) {
    const keys = bookingSlotsModal.available ? Object.keys(bookingSlotsModal.available) : []

    if (keys.length) {
      // eslint-disable-next-line
      return keys.map(key => ({ ...bookingSlotsModal.available[key], slot_time: key }))
    }
  }
  if (venue.data && venue.data.time_slots) {
    const keys = Object.keys(venue.data.time_slots)

    // eslint-disable-next-line
    return keys.map(key => ({ ...venue.data.time_slots[key], slot_time: key }))
  }
  return []
}

// TODO : Remove hot fix

/*
  Description of reason:
    Venue page uses currently booking modal.
    Booking modal expects that a search has been queried (at least once).
    This is not true in a case where you go to a venue page directly
    from the main page instead of making a search.
    ~m.sorja 2017
*/

const search = (state, field) => {
  if (!state || !state.search || !state.search[field]) {
    return []
  }
  return state.search[field]
}


const mapStateToProps = state => {
  const booking = state.booking
  const location = state.location
  const query = location.query
  const venueSelectorResult = venueSelector(search(state, 'searchResults'), booking.venue);
  return {
    chosenVenue: (state.venue && state.venue.venue) || venueSelectorResult,
    sport: booking.sport || query.sport_name,
    icons: state.venues.allSports,
    locale: state.i18n.locale,
    date: booking.date || query.date,
    sportsListVisible: booking.sportsListVisible,
    slots: slotsSelector(booking.slots, venueSelectorResult),
    activeSlot: booking.activeSlot || query.time,
    selectedCourts: booking.selectedCourts,
    auth: state.auth.authenticated,
    duration: query.duration || booking.duration,
    loaded: booking.loaded
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Booking)
