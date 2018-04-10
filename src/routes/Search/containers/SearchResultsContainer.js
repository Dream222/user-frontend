import { connect } from 'react-redux'
import SearchResults from '../components/SearchResults'
import { chooseSlot, onSlotSelect } from '../../../actions/booking-actions'
import { onSubmit } from '../../../modules/searchgrid'
import { show } from 'redux-modal'

const mapDispatchToProps = {
  chooseSlot,
  show,
  onSlotSelect,
  onSubmit
}

const mapStateToProps = state => ({
  searchResults: state.search.searchResults,
  searching: state.searchgrid.searching,
  queryParams: state.location.query,
  pageNumber: state.search.pageNumber,
  perPage: state.search.perPage
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
