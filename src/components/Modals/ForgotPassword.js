import React, { PropTypes } from 'react'
import { connectModal } from 'redux-modal'
import { Modal } from 'react-bootstrap'
import ForgotPasswordForm from 'forms/forgotpassword'

const ForgotPassword = ({ show, handleHide, forgotPassword, isResetPassword }) =>
  <Modal
    backdrop={true}
    dialogClassName="login-modal hex-modal"
    onHide={handleHide}
    show={show}>
    <i className="icon-hex-close modal-close color-white" onClick={handleHide} />
    <Modal.Body>
      <div className="flex-col pal pam-mobile">
        <div className="flex-row flex-hc">
          <i className="icon-logo-playven color-primary-brand" />
        </div>
        <ForgotPasswordForm
          buttonState={isResetPassword}
          onSubmit={credentials => {
            forgotPassword(credentials)
          }} />
      </div>
    </Modal.Body>
  </Modal>

ForgotPassword.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  isResetPassword: PropTypes.bool.isRequired
}

export default connectModal({
  name: 'forgotpassword'
})(ForgotPassword)
