import React, { PropTypes } from 'react'
import Text from 'containers/Text'
import SelectPlayven from '../SelectPlayven'
import GamePassDialogHeader from './GamePassDialogHeader'
import GamePassDialogOption from './GamePassDialogOption'

const GamePassDialog = ({ court, options, selectGamePass }) =>
  <div className="flex">
    <div className="gamePassDialog color-bdb-grey-300 flex-row flex-col-mobile">
      <div className="flex">
        <SelectPlayven
          clearable={true}
          disabled={false}
          headerMenuComponent={GamePassDialogHeader}
          onChange={e => selectGamePass(e && e.value, court)}
          openMenuToBottom={true}
          optionComponent={GamePassDialogOption}
          options={options}
          placeholder={Text.t('modals.payment.select_game_pass')}
          searchable={false}
          value={court.selectedGamePassId} />
      </div>
    </div>
  </div>

GamePassDialog.propTypes = {
  court: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
  })),
  selectGamePass: PropTypes.func.isRequired
}

export default GamePassDialog

