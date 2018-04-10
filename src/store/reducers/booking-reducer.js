import {
  CHOOSE_SLOT,
  CHANGE_DATE,
  DISPLAY_BOOKING_RESULTS,
  SPORTS_LIST_VISIBILITY,
  CHANGE_SPORT,
  ON_SLOT_SELECT,
  ON_COURT_SELECT,
  UPDATE_VENUE_SLOTS,
  TOGGLE_LOADED,
  TOGGLE_CARDS_LOADED,
  CLEAR_STATE,
  CLEAR_SELECTED_COURTS,
  SAVE_CARDS,
  SELECT_CARD,
  UPDATE_DURATION,
  SET_AVAILABILITY_VIEW,
  ADD_GAME_PASS,
  GAME_PASSES_CLEAR,
  GAME_PASSES_REJECTED,
  SELECT_GAME_PASS
} from '../../actions/booking-actions'

import utils from '../../utils'

const initialState = {
  availabilityView: 'grid',
  venue: {},
  date: '',
  displayBookingResults: false,
  sportsListVisible: false,
  sport: '',
  activeSlot: '',
  slots: {},
  selectedCourts: [],
  loaded: true,
  cards: [],
  cardsLoaded: true,
  selectedCard: '',
  duration: '',
}

let index

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case CHOOSE_SLOT:
      return {
        ...state,
        venue: action.payload
      }
    case CHANGE_DATE:
      return {
        ...state,
        date: action.payload
      }
    case SPORTS_LIST_VISIBILITY:
      return {
        ...state,
        sportsListVisible: !state.sportsListVisible
      }
    case CHANGE_SPORT:
      return {
        ...state,
        sport: action.payload
      }
    case ON_SLOT_SELECT:
      return {
        ...state,
        activeSlot: action.payload
      }

    case ON_COURT_SELECT: {
      index = state.selectedCourts.indexOf(action.payload)

      if (index !== -1) {
        return {
          ...state,
          selectedCourts: [
            ...state.selectedCourts.slice(0, index),
            ...state.selectedCourts.slice(index + 1)
          ]
        }
      }

      const newCourt = action.payload

      const filteredCourts = state.selectedCourts.filter(oldCourt => {
        // if the court is different, we can just skip the filtering
        if (oldCourt.id !== newCourt.id) {
          return 1
        }

        newCourt.endTime = utils.time.addToTime(newCourt.start_time, newCourt.duration)
        oldCourt.endTime = utils.time.addToTime(oldCourt.start_time, oldCourt.duration)

        const oldCourtTimeFrame = [newCourt.start_time, newCourt.endTime]
        const newCourtTimeFrame = [oldCourt.start_time, oldCourt.endTime]

        if (utils.time.collapses(oldCourtTimeFrame, newCourtTimeFrame)) {
          return 0
        }

        return 1
      })

      return {
        ...state,
        selectedCourts: [
          ...filteredCourts,
          action.payload
        ]
      }
    }

    case UPDATE_VENUE_SLOTS:
      return {
        ...state,
        slots: action.payload
      }

    case DISPLAY_BOOKING_RESULTS:
      return {
        ...state,
        displayBookingResults: true
      }

    case TOGGLE_LOADED:
      return {
        ...state,
        loaded: !state.loaded
      }

    case TOGGLE_CARDS_LOADED:
      return {
        ...state,
        cardsLoaded: !state.cardsLoaded
      }

    case CLEAR_STATE:
      return {
        ...initialState
      }
    case CLEAR_SELECTED_COURTS:
      return {
        ...state,
        selectedCourts: []
      }

    case SAVE_CARDS:
      return {
        ...state,
        cards: action.payload
      }
    case SELECT_CARD:
      return {
        ...state,
        selectedCard: action.payload
      }

    case SET_AVAILABILITY_VIEW:
      return {
        ...state,
        availabilityView: action.payload
      }

    case UPDATE_DURATION:
      return {
        ...state,
        duration: action.payload
      }

    case ADD_GAME_PASS:
      const selectedCourts = state.selectedCourts.map(court => {
        if (court.id !== action.courtId) return court
        return { ...court, gamePasses: action.payload }
      })

      return {
        ...state,
        selectedCourts: selectedCourts
      }

    case GAME_PASSES_CLEAR, GAME_PASSES_REJECTED:
      return {
        ...state,
        selectedCourts: state.selectedCourts.map((court) => ({...court, selectedGamePassId: null}))
      }

    case SELECT_GAME_PASS:
      index = state.selectedCourts.indexOf(action.court)
      if (index === -1) return state
      return {
        ...state,
        selectedCourts: [
          ...state.selectedCourts.slice(0, index),
          {...state.selectedCourts[index], selectedGamePassId: action.payload},
          ...state.selectedCourts.slice(index + 1)
        ]
      }

    default:
      return state
  }
}
