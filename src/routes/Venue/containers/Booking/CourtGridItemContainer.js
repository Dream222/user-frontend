import { connect } from 'react-redux'

import { onCourtSelect } from '../../../../actions/booking-actions'
import CourtGridItem from '../../components/Booking/CourtGridItem'


const mapStateToProps = () => ({})

const mapDispatchToProps = {
  onCourtSelect
}


export default connect(mapStateToProps, mapDispatchToProps)(CourtGridItem)
