import { connect } from 'react-redux'

import Availability from '../../components/Booking/Availability'
import { setAvailabilityView } from '../../../../actions/booking-actions'


const mapStateToProps = state => ({
  availabilityView: state.booking.availabilityView
})

const mapDispatchToProps = {
  setAvailabilityView
}


export default connect(mapStateToProps, mapDispatchToProps)(Availability)
