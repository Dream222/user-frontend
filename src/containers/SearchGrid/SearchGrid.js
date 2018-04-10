import { connect } from 'react-redux'
import SearchGrid from '../../components/SearchGrid'
import { onSubmit } from '../../modules/searchgrid'
import { searchBarChangeSport, searchBarChangeDuration,
         searchBarChangeDate, searchBarChangeTime } from '../../actions/menu-actions'

const mapDispatchToProps = {
  onSubmit,
  changeSport: searchBarChangeSport,
  changeDuration: searchBarChangeDuration,
  changeDate: searchBarChangeDate,
  changeTime: searchBarChangeTime
}

const mapStateToProps = (state) => ({
  preselectedSport: (state.menu.sportName || state.location.query.sport_name || 'tennis'),
  preselectedDate: (state.menu.date || state.location.query.date),
  preselectedTime: (state.menu.time || state.location.query.time),
  preselectedDuration: (state.menu.duration || state.location.query.duration)
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchGrid)
