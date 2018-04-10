import React, { PropTypes, Component } from 'react'
import utils from '../../../utils'
import Fa from 'react-fontawesome'
import Pagination from '../containers/Pagination'
import SearchResultItem from './SearchResultItem'
import Booking from '../../../containers/Modals/Booking'
import NotLogged from '../../../containers/Modals/NotLogged'
import Payment from '../../../containers/Modals/Payment'
import Success from '../../../containers/Modals/Success'
import _ from 'lodash'
import Text from 'containers/Text'

import './SearchView.scss'

class SearchResults extends Component {

  componentDidMount() {
    const { queryParams, onSubmit } = this.props

    if (Object.keys(queryParams).length) {
      onSubmit(null, queryParams)
    }
  }

  render() {
    const {
        searchResults,
        searching,
        show,
        chooseSlot,
        onSlotSelect,
        pageNumber,
        perPage } = this.props
    const pageSearchResults = utils.chunkify(searchResults, perPage)
    const maxPage = pageSearchResults.length - 1

    return (
      <div>
        <div className="mhs mbm">
          <div className="venue-results">
            {searching &&
            <Fa className="loading color-primary-brand"
              name="refresh"
              spin={true}
              stack="2x" />
          }
            {!searching && _.flatten(pageSearchResults).length > 0 &&
            <div className="venue-results-grid">
              {pageSearchResults[pageNumber].map((result, index) =>
                <SearchResultItem
                  chooseSlot={chooseSlot}
                  key={index}
                  onSlotSelect={onSlotSelect}
                  result={result}
                  show={show} />
            )}
            </div>
          }
          {!searching && _.flatten(pageSearchResults).length === 0 &&
            <Text text="components.venue_search.not_found" />
          }
          </div>
          <Booking />
          <NotLogged />
          <Payment />
          <Success />
        </div>
        {!searching && pageSearchResults.length > 1 &&
        <Pagination
          className="mhl mbm"
          maxPage={maxPage}
          pageNumber={pageNumber}
          perPage={perPage}
          totalItems={searchResults.length} />}
      </div>
    )
  }
}

SearchResults.propTypes = {
  chooseSlot: PropTypes.func.isRequired,
  // search: PropTypes.func.isRequired,
  onSlotSelect: PropTypes.func.isRequired,
  searching: PropTypes.bool.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  show: PropTypes.func.isRequired,
  queryParams: PropTypes.object,
  pageNumber: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default SearchResults
