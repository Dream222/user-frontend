import { LOCATION_CHANGE } from '../../store/location'
import * as actions from '../../actions/action-types'

const initialState = {
  isMobileMenuOpen: false,
  // fill these as null to make URL params take precedence, but once selected
  // keep it on re-render; needed to maintain status on full re-render on location change
  sport: null,
  duration: null,
  date: null,
  time: null
}
const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.TOGGLE_MOBILE_MENU:
      const hasPayload = typeof action.payload !== 'undefined'
      return {
        ...state,
        isMobileMenuOpen: hasPayload ? action.payload : !state.isMobileMenuOpen
      }

    case LOCATION_CHANGE: {
      return {
        ...state,
        isMobileMenuOpen: false
      }
    }

    case actions.SEARCH_BAR_CHANGE_SPORT: {
      return {
        ...state,
        sportName: action.payload
      }
    }

    case actions.SEARCH_BAR_CHANGE_DURATION: {
      return {
        ...state,
        duration: action.payload
      }
    }

    case actions.SEARCH_BAR_CHANGE_DATE: {
      return {
        ...state,
        date: action.payload
      }
    }

    case actions.SEARCH_BAR_CHANGE_TIME: {
      return {
        ...state,
        time: action.payload
      }
    }

    default:
      return state
  }
}

export default menuReducer
