import React, { PropTypes } from 'react'
import moment from 'moment'
import Text from 'containers/Text'
import { I18n } from 'react-redux-i18n'
import SummaryItem from './SummaryItem'

class VenueItem extends React.Component {
  static propTypes = {
    selectedCourts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      start_time: PropTypes.string.isRequired,  // eslint-disable-line camelcase
      endTime: PropTypes.string
    })).isRequired,
    venueName: PropTypes.string.isRequired,
    venueImage: PropTypes.string.isRequired,
    fetchGamePassesForCourt: PropTypes.func.isRequired,
    selectGamePass: PropTypes.func.isRequired,
    openDetails: PropTypes.bool,
    date: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpen: this.props.openDetails
    }
    this.onToggleDropdown = this.onToggleDropdown.bind(this)
  }

  onToggleDropdown(e) {
    e.preventDefault(e)
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { selectedCourts, venueName, venueImage, date } = this.props

    const summaryItems = selectedCourts.map(court =>
      <SummaryItem
        court={court}
        fetchGamePassesForCourt={this.props.fetchGamePassesForCourt}
        key={`${court.id}-${court.start_time}-${court.endTime}`}
        selectGamePass={this.props.selectGamePass} />)
    const sumDuration = selectedCourts.reduce((prevValue, obj) => prevValue + obj.duration, 0)
    const courtText = I18n.t('modals.payment.court', { count: selectedCourts.length })

    return (
      <div className={`venue-item color-bg-grey-150 t5 mrs mbs ${this.state.isOpen ? 'open' : ''}`}>
        <div className="flex-row flex-col-mobile pat">
          <div className="venue-item__day text-uc color-turquoise mrs">
            {moment(date, 'DD/MM/YYYY').format('dddd, MMM Do YYYY')}
          </div>
          <div className="venue-item__total text-uc">
            {`${courtText}, ${sumDuration} min`}
          </div>
          <div className="venue-item__details text-right">
            <button className="text-uc color-turquoise" onClick={this.onToggleDropdown}>
              <Text
                text={
                  this.state.isOpen ? 'modals.payment.hide_details' : 'modals.payment.show_details'
                } />
              <i className="icon-up-arrow" />
            </button>
          </div>
        </div>
        <div className="venue-item__content flex-col pas color-bdt-lighter-grey">
          <div className="venue-item__court-name flex-row flex-vc mhs mbs">
            <div className="court-name__photo-wrap mrs">
              <div style={{ backgroundImage: `url(${venueImage})` }} />
            </div>
            <div className="court-name__content-wrap">
              <h5 className="color-grey-900">{venueName}</h5>
            </div>
          </div>
          {summaryItems}
        </div>
      </div>
    )
  }
}

export default VenueItem
