import React from 'react'
import { Modal } from 'react-bootstrap'
import ResetPasswordForm from 'forms/resetpassword'
import './ResetPassword.scss'

const ResetPassword = ({ resetPassword, isRequestingToResetPassword }) =>
  <Modal backdrop={true} className="reset-background" dialogClassName="login-modal hex-modal" show={true} >
    <Modal.Body>
      <div className="flex-col pal pam-mobile">
        <div className="flex-row flex-hc">
          <i className="icon-logo-playven color-primary-brand" />
        </div>
        <ResetPasswordForm
          isRequestingToResetPassword={isRequestingToResetPassword}
          onSubmit={credentials => {
            resetPassword(credentials)
          }} />
      </div>
    </Modal.Body>
  </Modal>

export default ResetPassword;
