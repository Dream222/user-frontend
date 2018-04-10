import { connect } from 'react-redux'
import { show } from 'redux-modal'

import Reservation from '../../components/Booking/Reservation'


const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
})

const mapDispatchToProps = {
  openModal: show
}


export default connect(mapStateToProps, mapDispatchToProps)(Reservation)
