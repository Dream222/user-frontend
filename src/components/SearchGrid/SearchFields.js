import { connect } from 'react-redux'
import { Fields } from '../../components/SearchGrid/FormFields'

const fields = state => state.searchgrid.fields
const query = ownProps => ownProps.location.query

const mapStateToProps = {

  Sport: state => ({
    sports: state.venues.allSports,
    param: query(state).sport_name
  }),
  Duration: state => ownProps => ({
    durations: fields(state).durations,
    param: query(ownProps).duration
  }),
  Date: state => {
    return ({
      locale: ownProps.i18n.locale,
      param: query(ownProps).date
    });
  },
  Time: state => ownProps => ({
    timetable: fields(state).timetable,
    param: query(ownProps).time
  }),
  Submit: () => ({})
}

export default {
  Sport: connect(mapStateToProps.Sport)(Fields.Sport),
  Duration: connect(mapStateToProps.Duration)(Fields.Duration),
  Date: connect(mapStateToProps.Date)(Fields.Date),
  Time: connect(mapStateToProps.Time)(Fields.Time),
  Submit: connect(mapStateToProps.Submit)(Fields.Submit)
}
