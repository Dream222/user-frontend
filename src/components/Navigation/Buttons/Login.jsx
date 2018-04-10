import React from 'react'
import { show } from 'redux-modal'
import Text from '../../../containers/Text'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginModal from '../../../containers/Modals/Login'
import iconUser from 'assets/icons/icon-user.svg'

const Login = ({ show }) =>
  <div>
    <button className="navigation-link" onClick={() => show('login')}>
      <img alt="user" src={iconUser} />
      <Text text="nav.login" />
    </button>
    <LoginModal />
  </div>

export default connect(
  null,
  dispatch => ({
    ...bindActionCreators({
      show
    }, dispatch)
  })
)(Login)
