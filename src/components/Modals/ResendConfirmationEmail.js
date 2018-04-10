import React, { PropTypes } from 'react'
import { connectModal } from 'redux-modal'
import { Modal } from 'react-bootstrap'
import ResendConfirmationEmailForm from 'forms/resend_confirmation_email'

export class ResendConfirmationEmail extends React.Component {
  renderCloseIcon(handleHide) {
    return (
      <button className="close" onClick={handleHide}>
        <span>
          <i className="modal__close" />
        </span>
      </button>
    )
  }

  renderModalLogo() {
    return (
      <div className="modal__header modal__header_login">
        <div className="modal__logo" />
      </div>
    )
  }

  render() {
    const { show, handleHide, resendConfirmationEmail, email, isRequestingToResend } = this.props
    const emailObj = {
      user: {
        email
      } }

    return (
      <Modal
        backdrop={true}
        dialogClassName="login-modal hex-modal"
        onHide={handleHide}
        show={show} >
        <i className="icon-hex-close modal-close color-white" onClick={handleHide} />
        <Modal.Body>
          <div className="flex-col pal pam-mobile">
            <div className="flex-row flex-hc">
              <i className="icon-logo-playven color-primary-brand" />
            </div>
            <ResendConfirmationEmailForm
              buttonState={isRequestingToResend}
              onSubmit={() => {
                resendConfirmationEmail(emailObj)
              }} />
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

ResendConfirmationEmail.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  resendConfirmationEmail: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  isRequestingToResend: PropTypes.bool.isRequired
}

export default connectModal({
  name: 'resendconfirmationemail'
})(ResendConfirmationEmail)
