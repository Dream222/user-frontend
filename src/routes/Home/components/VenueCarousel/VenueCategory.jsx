import React, { Component, PropTypes } from 'react'
import Text from '../../../../containers/Text'

/*
  Requires functionality to work
  1. Add overlay on button click
 */

class VenueCategory extends Component {
  componentDidMount() {
    const { getSportNames, activeSport, allSports, selectActiveSport } = this.props

    getSportNames()
    if (!activeSport && allSports && allSports[0]) {
      selectActiveSport(allSports[0])
    }
  }

  handleClick = sport => {
    const { selectActiveSport, toggleSportSelectionMenu, getVenues } = this.props

    selectActiveSport(sport);
    toggleSportSelectionMenu()
    getVenues(sport.sport)
  }

  render() {
    const { allSports,
            activeSport,
            selectingNewSport,
            toggleSportSelectionMenu
    } = this.props

    const display = selectingNewSport ? 'block' : 'none';
    const filteredSports = allSports.filter(v => v.sport !== activeSport.sport)

    return (
      <div className="venue-category">
        <div className="venue-category-dropdown">

          <i className="icon-hex venue-category-dropdown-hex" onClick={toggleSportSelectionMenu} />
          <i className={`icon-${activeSport.sport} venue-category-dropdown-logo`} onClick={toggleSportSelectionMenu} />
          <i className="icon-down-arrow venue-category-dropdown-arrow" onClick={toggleSportSelectionMenu} />

          <div className="venue-category-dropdown-menu" style={{ display }}>
            <div />
            {filteredSports.map((sport, index) =>
              <div key={index} onClick={() => this.handleClick(sport)}>
                <i className={`icon-${sport.sport} color-white`} />
              </div>)}
            <i className="icon-hex venue-category-dropdown-end" />
          </div>
        </div>

        <a className="venue-category-button pl-btn-dark" href="#">
          <Text text="pages.home.sports_list" />
          <i className="icon-long-arrow-right t5 mls" />
        </a>
      </div>
    )
  }
}

VenueCategory.propTypes = {
  activeSport: PropTypes.object,
  allSports: PropTypes.arrayOf(
    PropTypes.shape
  ).isRequired,
  getSportNames: PropTypes.func.isRequired,
  getVenues: PropTypes.func.isRequired,
  selectActiveSport: PropTypes.func.isRequired,
  selectingNewSport: PropTypes.bool.isRequired,
  toggleSportSelectionMenu: PropTypes.func.isRequired
}

VenueCategory.defaultProps = {
  activeSport: { sport: 'tennis' }
}

export default VenueCategory
