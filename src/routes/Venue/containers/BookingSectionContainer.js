import { connect } from 'react-redux'

import BookingSection from '../components/BookingSection'


const slotsSelector = slots => {
  if (Object.keys(slots).length) {
    const keys = slots.available ? Object.keys(slots.available) : []

    if (keys.length) {
      return keys.map(key => ({ ...slots.available[key], slot_time: key }))
    }
  }

  return []
}

const mapStateToProps = state => ({
  displayBookingResults: state.booking.displayBookingResults,
  loading: !state.booking.loaded,
  selectedCourts: state.booking.selectedCourts,
  slots: slotsSelector(state.booking.slots)
})


export default connect(mapStateToProps)(BookingSection)
