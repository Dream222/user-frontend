import React from 'react'
import { Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'
import moment from 'moment'
import toastr from 'toastr'
import Header from './Header/'
import Footer from './Footer/'
import Text from '../../../containers/Text'
import BookingResultSlotList from './Content/BookingResultSlotList'
import BookingResultTimeSlotList from './Content/BookingResultTimeSlotList'
import Fa from 'react-fontawesome'

export const Booking = props => {
  const {
    openModal,
    show,
    handleHide,
    icons,
    sport,
    submitSearch,
    chosenVenue,
    locale,
    date,
    changeDate,
    sportsListVisible,
    toggleSportsList,
    changeSport,
    slots,
    activeSlot = 0,
    onSlotSelect,
    onCourtSelect,
    selectedCourts,
    fetchSingleVenue,
    auth,
    clearState,
    duration,
    clearSelectedCourts,
    loaded
  } = props



  const onHide = () => {
    handleHide()
    clearState()
  }

  const activeslot_time = show && moment().startOf('day').minutes(activeSlot).format('HH:mm')
  const selectedSlot = slots.filter(slot => {
    const slot_time = moment(slot.slot_time, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')

    return slot_time === activeslot_time
  })[0]

  const params = {
    venueId: chosenVenue.venue_id,
    time: activeslot_time,
    duration,
    // eslint-disable-next-line
    sport_name: sport,
    date
  }
  const onSportChange = newSport => {
    changeSport(newSport)
    clearSelectedCourts()
    // eslint-disable-next-line
    fetchSingleVenue({ ...params, sportName: newSport })
  }
  const onDateChange = newDate => {
    changeDate(moment(newDate).format('DD/MM/YYYY'))
    clearSelectedCourts()
    fetchSingleVenue({ ...params, date: moment(newDate).format('DD-MM-YYYY') })
  }
  const onBookClick = () => {
    if (!selectedCourts.length) {
      toastr.warning(Text.t('messages.errors.no_courts_selected'), '', {
        progressBar: true,
        timeOut: 2500
      })
      return false
    }

    handleHide()

    if (!auth) {
      openModal('notlogged')
      return false
    }
    
    openModal('payment', chosenVenue)
    return true
  }

  return (
    <Modal dialogClassName="booking-modal" onHide={onHide} show={show}>
      <Modal.Header>
        <button
          aria-label="Close"
          className="booking-modal__close-button"
          onClick={onHide}
          type="button">
          Close
        </button>
      </Modal.Header>
      <Modal.Body className="booking-modal__content">
        <Header
          changeDate={onDateChange}
          changeSport={onSportChange}
          date={date}
          icons={icons}
          locale={locale}
          sport={sport}
          sportsListVisible={sportsListVisible}
          submitSearch={submitSearch}
          toggleSportsList={toggleSportsList}
          venue={chosenVenue} />
        <div className="booking-modal__slot-picker flex-row-desktop color-bg-white">
          <BookingResultSlotList
            activeSlot={selectedSlot}
            onSlotSelect={onSlotSelect}
            slots={slots} />

          <div className="booking-modal__available-courts flex-row flex-vc flex-hc">
            {!loaded &&
            <Fa
              className="spinner color-primary-brand"
              name="refresh"
              spin={true}
              stack="2x" />
            }
            {loaded &&
            <BookingResultTimeSlotList
              activeSlot={selectedSlot}
              duration={duration}
              empty={slots.length === 0}
              onCourtSelect={onCourtSelect}
              removable={false}
              selectedCourts={selectedCourts}
              slot={selectedSlot} />
            }
          </div>
        </div>

        <Footer
          duration={duration}
          onBook={onBookClick}
          onCourtSelect={onCourtSelect}
          selectedCourts={selectedCourts}
          selectedSlot={selectedSlot} />
      </Modal.Body>
    </Modal>
  )
}

export default connectModal({
  name: 'booking'
})(Booking)
