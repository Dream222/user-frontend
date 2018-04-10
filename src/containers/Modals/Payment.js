import { connect } from 'react-redux'
import { show } from 'redux-modal'
import Payment from '../../components/Modals/Payment/'
import { bookWithoutPayment, pay, getCards, addCard, getGamePasses } from '../../api/reservation-api'
import { selectCard, clearSelectedCourts, selectGamePass } from '../../actions/booking-actions'

const mapDispatchToProps = {
  bookWithoutPayment,
  pay,
  openModal: show,
  getCards,
  addCard,
  selectCard,
  clearSelectedCourts,
  getGamePasses,
  selectGamePass,
}
const mapStateToProps = state => {
  const booking = state.booking
  const location = state.location
  const query = location.query
  // ensure that we don't pass empty string
  let duration = parseInt(query.duration || booking.duration)
  duration = isNaN(duration) ? undefined : duration
  return {
    loaded: !booking.loaded,
    cardsLoaded: !booking.cardsLoaded,
    user: state.auth.user,
    selectedCourts: booking.selectedCourts,
    duration: duration,
    date: booking.date || query.date,
    cards: booking.cards,
    selectedCard: booking.selectedCard,
    locale: state.i18n.locale,
    gamePasses: booking.gamePasses
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment)
