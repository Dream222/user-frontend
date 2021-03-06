import React from 'react'
import { show } from 'redux-modal'
import Text from '../../../containers/Text'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import RegisterModal from '../../../containers/Modals/Register'

const Register = ({ show }) =>
  <div className="mrs-gt-mobile">
    <button className="navigation-link" onClick={() => show('register')}>
      <Text text="nav.register" />
    </button>
    <RegisterModal />
  </div>

export default connect(
  null,
  dispatch => ({
    ...bindActionCreators({
      show
    }, dispatch)
  })
)(Register)
