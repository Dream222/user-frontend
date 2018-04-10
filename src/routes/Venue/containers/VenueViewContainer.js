import { connect } from 'react-redux'
import VenueView from '../components/VenueView'
import { loadVenue } from '../modules/venue'
import { getSportNames } from '../../../api/venue-api'


const mapStateToProps = state => ({
  venue: state.venue.venue,
  imageIndex: state.venue.imageIndex,
  pathName: state.routing.locationBeforeTransitions.pathname.split('/')[2]
})

const mapDispatchToProps = {
  loadVenue,
  getSportNames
}


export default connect(mapStateToProps, mapDispatchToProps)(VenueView)
