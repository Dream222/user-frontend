/* eslint-disable react/jsx-no-bind */

import React, { Component, PropTypes } from 'react'
import toastr from 'toastr'
import PropTypeShapes from 'components/PropTypes'
import Text from 'containers/Text'

import SelectedCourts from './SelectedCourts'


class Reservation extends Component {
  onBookClick() {
    const { authenticated, openModal, selectedCourts, venue } = this.props

    if (!selectedCourts.length) {
      toastr.warning(Text.t('messages.errors.no_courts_selected'), '', {
        progressBar: true,
        timeOut: 2500
      })
      return false
    }

    if (!authenticated) {
      openModal('notlogged')
      return false
    }

    openModal('payment', venue)
    return true
  }

  render() {
    const { selectedCourts } = this.props

    return (
      <div>
        <div className="flex-row flex-hc">
          <h3 className="section-title mam centered">
            <Text text="modals.booking.your_reservation" />
          </h3>
        </div>
        <div className="flex-row-gt-mobile color-bg-light-blue pvm">
          <div
            className="flex flex-row flex-vc"
            style={{
              borderBottomRightRadius: '.25rem',
              borderBottomLeftRadius: '.25rem'
            }}>
            <div className="flex phs">
              { !(selectedCourts && selectedCourts.length > 0) ||
              <SelectedCourts selectedCourts={selectedCourts} />
              }
            </div>
          </div>
          <div className="flex-row flex-hc flex-vc phm pts-mobile">
            <button
              className="blue-btn "
              onClick={this.onBookClick.bind(this)}
              style={{
                padding: '1rem 1.5rem'
              }}>
              <Text text="pages.venues.book_now" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

Reservation.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  selectedCourts: PropTypes.arrayOf(PropTypeShapes.court),
  venue: PropTypes.object.isRequired
}


export default Reservation
