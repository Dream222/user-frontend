import { connect } from 'react-redux'
import {
    selectActiveSport,
    getSportNames,
    toggleSportSelectionMenu,
    getVenues
} from '../../../actions/venue-actions'

import VenueCategory from '../components/VenueCarousel/VenueCategory'

const mapStateToProps = (state) => ({
  allSports : state.venues.allSports,
  activeSport : state.venues.activeSport,
  selectingNewSport: state.venues.selectingNewSport
})

const mapDispatchToProps = {
  getSportNames,
  selectActiveSport,
  toggleSportSelectionMenu,
  getVenues
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueCategory)
