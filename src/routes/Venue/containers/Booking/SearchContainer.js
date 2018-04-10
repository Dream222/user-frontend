import { connect } from 'react-redux'

import Search from '../../components/Booking/Search'
import { fetchSingleVenue } from '../../../../api/venue-api'
import {
  changeDate,
  changeSport,
  chooseSlot,
  onSlotSelect,
  updateDuration,
  clearState
} from '../../../../actions/booking-actions'


const mapStateToProps = state => ({
  sports: state.venues.allSports,
  sport: state.booking.sport,
  date: state.booking.date
})

const mapDispatchToProps = {
  changeDate,
  changeSport,
  chooseSlot,
  onSlotSelect,
  updateDuration,
  fetchSingleVenue,
  clearState
}


export default connect(mapStateToProps, mapDispatchToProps)(Search)
