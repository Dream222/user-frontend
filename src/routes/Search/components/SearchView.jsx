import React, { Component } from 'react'
import Navigation from '../../../containers/Navigation'
// TODO: Needs to be fixed
import SearchGrid from '../../../containers/Searchgrid/SearchGrid'
import SearchResults from '../containers/SearchResultsContainer'
// import './SearchView.scss'

class Search extends Component {
  componentDidMount() {
    const { getSportNames } = this.props

    getSportNames()
  }

  render() {
    return (
      <div className="flex color-bg-light-blue">
        <header>
          <Navigation theme={'light'} />
        </header>

        <div className="mtm mhm mbs">
          <SearchGrid />
        </div>

        <SearchResults />
      </div>
    )
  }
}

export default Search
