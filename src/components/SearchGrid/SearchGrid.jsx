import React, { PropTypes } from 'react'
import Fields from '../../containers/SearchGrid/SearchFields'
import './form-fields.scss'

const SearchGrid = ({onSubmit, preselectedSport, preselectedDate,
                     preselectedTime, preselectedDuration, changeSport,
                     changeDuration, changeTime, changeDate }) =>
  <form onSubmit={onSubmit} role="search">
    <div className="venue-search-bar">
      <Fields.Sport param={preselectedSport}
                    onChange={(event) => changeSport(event.currentTarget.value) }/>
      <Fields.Duration param={preselectedDuration}
                       onChange={(event) => changeDuration(event.currentTarget.value) }/>
      <Fields.Date param={preselectedDate}
                   onChange={(date) => changeDate(date) }/>
      <Fields.Time param={preselectedTime}
                   onChange={(event) => changeTime(event.currentTarget.value) }/>
      <Fields.Submit />
    </div>
  </form>


SearchGrid.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  preselectedSport: PropTypes.string,
  preselectedDate: PropTypes.string,
  preselectedDuration: PropTypes.string,
  preselectedTime: PropTypes.string,
  changeDuration: PropTypes.func,
  changeTime: PropTypes.func,
  changeSport: PropTypes.func,
  changeDate: PropTypes.func
}

export default SearchGrid
