import { connect } from 'react-redux'
import VenueCarousel from '../components/VenueCarousel'
import { getVenues } from '../../../actions/venue-actions'

/*
initialState
{
  allVenues: [],
  allSports: []
}
*/

const mapStateToProps = (state) => ({
  allVenues : state.venues.allVenues
})

const mapDispatchToProps = {
  getVenues
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueCarousel)
