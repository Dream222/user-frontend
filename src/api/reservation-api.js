import axios from 'axios'
import toastr from 'toastr'
import { show, destroy } from 'redux-modal'
import { toggleLoaded, toggleCardsLoaded, saveCards, selectCard, clearState,
  addGamePass, gamePassesRejected, gamePassesClear } from '../actions/booking-actions'
import apiEndpoints from '../../config/apis'
import { resellReservationSuccess, cancelReservationSuccess, toggleAlert } from '../routes/Profile/modules/profile'

export const bookWithoutPayment = (duration, date) => (dispatch, getState) => {
  const state = getState()
  const { selectedCourts } = state.booking
  const bookings = selectedCourts.map(court => {
    // eslint-disable-next-line
    const start_time = `${date} ${court.start_time}`

    // eslint-disable-next-line
    return { id: court.id, price: court.price, start_time, duration: court.duration }
  })

  return axios.post(`${apiEndpoints.playven}/reservations`, {
    duration,
    date,
    bookings: JSON.stringify(bookings)
  })
    .then(res => {
      dispatch(destroy('payment'))
      dispatch(show('success'))
      dispatch(clearState())
      toastr.success(res.data.message)
    })
    .catch(error => toastr.error(error.response.data.errors))
}

export const pay = (duration, date) => (dispatch, getState) => {
  const state = getState()
  const card = state.booking.selectedCard

  if (!card) {
    toastr.error('Please select a card to pay')
    return false
  }
  const { selectedCourts } = state.booking
  const bookings = selectedCourts.map(court => {
    // eslint-disable-next-line
    const start_time = `${date} ${court.start_time}`

    // eslint-disable-next-line
    return { id: court.id, price: court.price, start_time, duration: court.duration, game_pass_id: court.selectedGamePassId }
  })

  dispatch(toggleLoaded())
  return axios.post(`${apiEndpoints.playven}/reservations`, {
    duration,
    date,
    bookings: JSON.stringify(bookings),
    card,
    pay: true
  })
    .then(() => {
      dispatch(toggleLoaded())
      dispatch(destroy('payment'))
      dispatch(show('success'))
      dispatch(clearState())
    })
    .catch(() => {
      dispatch(toggleLoaded())
      toastr.error('Booking failed! something went wrong.')
    })
}

export const getCards = () => dispatch => {
  dispatch(toggleCardsLoaded())
  return axios.get(`${apiEndpoints.playven}/cards.json`)
    .then(response => {
      dispatch(toggleCardsLoaded())
      if (response.data.cards) {
        dispatch(saveCards(response.data.cards.data))
      }
      if (response.data.default_card) {
        dispatch(selectCard(response.data.default_card))
      }
    })
    .catch(() => {
      dispatch(toggleCardsLoaded())
    })
}

export const addCard = token => dispatch => {
  dispatch(toggleCardsLoaded())
  return axios.post(`${apiEndpoints.playven}/cards`, {
    token: token.id
  })
    .then(response => {
      dispatch(toggleCardsLoaded())
      dispatch(saveCards(response.data.cards.data))
      if (response.data.default_card) {
        dispatch(selectCard(response.data.default_card))
      }
    })
    .catch(() => {
      dispatch(toggleCardsLoaded())
      toastr.error('Card could not be added!')
    })
}

export const cancelReservation = reservation => dispatch => {
  axios.delete(`${apiEndpoints.playven}/reservations/${reservation.id}`)
    .then(({ data }) => {
      toastr.success(data.message)
      dispatch(cancelReservationSuccess(reservation))
      dispatch(toggleAlert())
    })
    .catch(error => {
      dispatch(toggleAlert())
      toastr.error(error.response.data.errors.join(', '))
    })
}

export const resellReservation = reservation => dispatch => {
  axios.get(`${apiEndpoints.playven}/reservations/${reservation.id}/resell`)
    .then(({ data }) => {
      toastr.success(data.message)
      dispatch(resellReservationSuccess(reservation))
    })
    .catch(error => {
      toastr.error(error.response.data.errors.join(', '))
    })
}

export const getGamePasses = ({ startTime, endTime, courtId, duration }) => dispatch => {
  const params = {
    /*eslint-disable */
    start_time: startTime,
    court_id: courtId,
    end_time: endTime,
    duration,
    /*eslint-enable */
  }

  dispatch(gamePassesClear())
  axios.get(`${apiEndpoints.playven}/game_passes/available`, { params })
    .then(({ data }) => {
      dispatch(addGamePass(data, courtId))
    })
    .catch(() => {
      dispatch(gamePassesRejected())
    })
}
