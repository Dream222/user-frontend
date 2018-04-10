import React, { PropTypes } from 'react'
import GamePassDialog from './GamePassDialog'

class SummaryItem extends React.Component {
  static propTypes = {
    fetchGamePassesForCourt: PropTypes.func.isRequired,
    court: PropTypes.object.isRequired,
    selectGamePass: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchGamePassesForCourt, court } = this.props

    fetchGamePassesForCourt(court)
  }

  render() {
    const { court, selectGamePass } = this.props
    const { name, price, gamePasses } = court
    const startTime = court.start_time
    const duration = court.duration
    const options = gamePasses && gamePasses.map(pass => ({ value: pass.value, label: pass.label }))
    const hasPasses = options && options.length > 0

    return (
      <div className="summary-item flex-row flex-col-mobile mbt">
        <div className="summary-item__holder_info flex-row phs pvt color-bg-grey-300">
          <div className="summary-item__name color-turquoise text-uc mrt">{name}</div>
          <div className="summary-item__time">{duration}min, {startTime}</div>
          <div className="summary-item__price color-turquoise">
            <span className="currency">{'\u20AC'}</span>{price.toFixed(2)}
          </div>
          <i className="icon-cross2 summary-item__remove color-red" />
        </div>
        <div className="summary-item__select">
          {hasPasses &&
            <GamePassDialog
              court={court}
              options={options}
              selectGamePass={selectGamePass} />
          }
        </div>
      </div>
    )
  }
}

export default SummaryItem
