import React, { Component } from 'react'
import utils from '../../../../utils'

import PropTypes from '../../../../components/PropTypes'
import Price from '../../../../components/Price'


class CourtButton extends Component {
  render() {
    const {
      className,
      court,
      selected
    } = this.props

    court.endTime = utils.time.addToTime(court.start_time, court.duration)

    let priceTheme = ''

    if (className === 'selected-for-booking') {
      priceTheme = 'white'
    }
    if (className === 'not-selectable') {
      priceTheme = 'grey'
    }

    return (
      <div
        className={`court-button flex-row ${className} ${selected ? 'court-button-selected' : ''}`}
        onClick={() => this.props.onCourtSelect(court)}>

        <div className="flex">
          <div className="name">
            {court.name}
          </div>

          <div className="flex-row time">
            { className === 'selected-for-booking' &&
            <div>
              <span>{ court.start_time }</span>
              <span>&nbsp;-&nbsp;</span>
              <span>{ court.endTime }</span>
            </div>
            }
            { className !== 'selected-for-booking' &&
            <div className="duration">
              {court.duration} min
            </div>
            }
          </div>
        </div>

        <Price
          amount={court.price}
          currency="€"
          theme={priceTheme} />
      </div>
    )
  }
}

CourtButton.propTypes = {
  className: React.PropTypes.string,
  duration: React.PropTypes.number,
  court: PropTypes.court.isRequired,
  onCourtSelect: React.PropTypes.func.isRequired,
  selected: React.PropTypes.bool.isRequired
}


export default CourtButton
