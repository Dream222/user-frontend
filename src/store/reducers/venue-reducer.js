import {
  GET_VENUE_SUCCESS,
  GET_SPORT_NAMES_SUCCESS,
  SET_ACTIVE_SPORT,
  TOGGLE_NEW_SPORT_SELECTION
} from '../../actions/venue-actions'


const initialState = {
  allVenues: [],
  allSports: [],
  selectingNewSport: false
}

export default function venueReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VENUE_SUCCESS:
      return {
        ...state,
        allVenues: action.allVenues
      }
    case GET_SPORT_NAMES_SUCCESS:
      return {
        ...state,
        activeSport: action.sports.sportnames[0],
        allSports: action.sports.sportnames
      }
    case SET_ACTIVE_SPORT:
      return {
        ...state,
        activeSport: action.activeSport
      }
    case TOGGLE_NEW_SPORT_SELECTION:
      return {
        ...state,
        selectingNewSport: !state.selectingNewSport
      }
    default:
      return state
  }
}
