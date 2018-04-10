/* eslint-disable react/jsx-no-bind */

import React, { Component, PropTypes } from 'react'
import Text from 'containers/Text'

export default class GamePassDialogOption extends Component {
  static propTypes = {
    className: PropTypes.string,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired
  }

  onHandleMouseDown(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.onSelect(this.props.option, event)
  }

  render() {
    return (
      <div className={this.props.className} onMouseDown={this.onHandleMouseDown.bind(this)}>
        <div className="gamePass_block color-white t5 text-uc flex-row">
          <div>{this.props.option.label}</div>
          <button className="gamePass_block__action mls text-uc">
            <Text text="modals.payment.use" />
          </button>
        </div>
      </div>
    )
  }
}
