import { connect } from 'react-redux'

import { onCourtSelect } from '../../../../actions/booking-actions'
import CourtButton from '../../components/Booking/CourtButton'


const mapStateToProps = () => ({})

const mapDispatchToProps = {
  onCourtSelect
}


export default connect(mapStateToProps, mapDispatchToProps)(CourtButton)
