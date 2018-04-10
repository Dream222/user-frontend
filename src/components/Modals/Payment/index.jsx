import React, { PropTypes } from 'react'
import Fa from 'react-fontawesome'
import { Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'
import ScrollArea from 'react-scrollbar'
import Text from '../../../containers/Text'
import { I18n } from 'react-redux-i18n'
import RemoteForm from './RemoteForm'
import CardDialog from './CardDialog'
import VenueItem from './VenueItem'
import moment from 'moment'

export const Payment = props => {
  const { show, handleHide, selectedCourts, user, loaded, cardsLoaded, onCardAdd,
    pay, bookWithoutPayment, duration, date, cards, getCards, addCard,
    selectCard, selectedCard, getGamePasses, selectGamePass } = props

  const venueName = props.venue_name
  const venueImage = props.image

  const skippable = selectedCourts.every(court => court.payment_skippable)
  const sumDuration = selectedCourts.reduce((prevValue, obj) => prevValue + obj.duration, 0)
  const priceWithDiscount = selectedCourts.reduce((sum, court) => {
    // please not that we want to use `==`, not `===`, due to value can be null
    // eslint-disable-next-line no-undefined, eqeqeq
    const price = court.selectedGamePassId == undefined ? court.price : 0

    return sum + price
  }, 0)

  const fetchGamePassesForCourt = court => {
    const startTime = moment(`${court.start_time} ${date}`, 'HH:mm DD-MM-YYYY')
      .format('YYYY-MM-DD HH:mm')
    // duration is specified on ?search page, but on /venue page it can be different durations
    // so they are stored inside court
    const courtDuration = court.duration || duration

    getGamePasses({ courtId: court.id, duration: courtDuration, startTime })
  }

  const onHide = () => {
    handleHide()
  }

  const doesCostAnything = priceWithDiscount > 0

  const skipButton = !loaded && skippable && doesCostAnything &&
    <div className="flex-row flex-he">
      <a
        className="skip_button blue-link t5 mtt text-uc"
        href="#"
        onClick={() => bookWithoutPayment(duration, date)}>
        <Text text="modals.payment.skip_payment" />
      </a>
    </div>

  const courtCount = I18n.t('modals.payment.court_count', { count: selectedCourts.length })

  return (
    <Modal backdrop={false}
      dialogClassName="payment-modal flex-he flex-row flex-vs"
      onHide={onHide}
      show={show}>
      <i className="icon-cross2 modal-close color-white" onClick={onHide} />
      <div className="payment-modal__overlay color-bg-turquoise" />
      <Modal.Body>
        <div className="payment-modal__modal-block color-bg-white flex-col pam pam-mobile">
          <div className="modal-block__main-container flex-col">
            <h2 className="flex-row flex-hs color-dark-grey text-uc em-high mbt">
              <Text text="modals.payment.title" />
            </h2>
            <div className="t5 text-uc color-light-grey mbm">
              <span>{courtCount} </span>
              <span> {sumDuration} </span>
              <Text text="modals.payment.minutes" />
            </div>
            <ScrollArea
              className="summary-items-wrapper"
              contentClassName="content"
              horizontal={false}
              speed={0.8}>
              <VenueItem
                date={date}
                fetchGamePassesForCourt={fetchGamePassesForCourt}
                openDetails={true}
                selectGamePass={selectGamePass}
                selectedCourts={selectedCourts}
                venueImage={venueImage}
                venueName={venueName} />
            </ScrollArea>
          </div>

          {cardsLoaded &&
          <div className="payment-modal__spinner flex-row flex-vc">
            <Fa className="color-primary-brand"
              name="refresh"
              spin={true}
              stack="2x" />
          </div>
          }

          <div className="modal-block__bottom-container mtm">
            <div className="flex-row flex-hb mbm">
              <h2 className="totalPriceTitle color-dark-grey">
                <Text text="modals.payment.total_price" />
              </h2>
              <h2 className="totalPrice color-turquoise">
                <span className="inline-span">
                  {priceWithDiscount} <span className="currency">{'\u20AC'}</span>
                </span>
              </h2>
            </div>
            <RemoteForm action="" type="post">
              <div className="flex-row flex-col-mobile">
                { doesCostAnything &&
                  <CardDialog
                    addCard={addCard}
                    cards={cards}
                    getCards={getCards}
                    loaded={cardsLoaded}
                    onCardAdd={onCardAdd}
                    selectCard={selectCard}
                    selectedCard={selectedCard}
                    user={user} />
                }
                {!cardsLoaded &&
                  <div className="flex-col flex-vc">
                    <button
                      className={
                        `pay-button pl-btn-primary ${doesCostAnything ? '' : 'big-button'}`
                      }
                      disabled={cardsLoaded || !cards.length}
                      onClick={() => pay(duration, date)}>
                      <Text text={
                        `modals.payment.${doesCostAnything ?
                          'pay_button' :
                          'pay_button_with_game_pass'}`
                      } />
                    </button>
                    {skipButton}
                  </div>
                }
              </div>
            </RemoteForm>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

Payment.propTypes = {
  venue: PropTypes.object,
  show: PropTypes.bool,
  handleHide: PropTypes.func,
  venue_name: PropTypes.string, // eslint-disable-line camelcase
  image: PropTypes.string,
  user: PropTypes.object.isRequired,
  loaded: PropTypes.bool,
  cardsLoaded: PropTypes.bool,
  onCardAdd: PropTypes.func,
  pay: PropTypes.func,
  bookWithoutPayment: PropTypes.func,
  duration: PropTypes.number,
  date: PropTypes.string.isRequired,
  getCards: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  selectCard: PropTypes.func.isRequired,
  selectedCard: PropTypes.string,
  clearSelectedCourts: PropTypes.func,
  getGamePasses: PropTypes.func,
  selectGamePass: PropTypes.func,
  selectedCourts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    start_time: PropTypes.string.isRequired,  // eslint-disable-line camelcase
    endTime: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    payment_skippable: PropTypes.bool.isRequired,  // eslint-disable-line camelcase
    name: PropTypes.string.isRequired,
    gamePasses: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      remaining_charges: PropTypes.string.isRequired,  // eslint-disable-line camelcase
      value: PropTypes.number.isRequired
    }))
  })).isRequired,
  cards: PropTypes.array // eslint-disable-line react/forbid-prop-types
}

export default connectModal({
  name: 'payment'
})(Payment)
