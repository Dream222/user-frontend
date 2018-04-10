import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Text from '../containers/Text'
import LaddaButton, { SLIDE_UP } from 'react-ladda'

// Todo: localisation

const ResendConfirmationEmailForm = props => {
  const { handleSubmit, buttonState } = props
  const headStyle = {
    textAlign: 'center'
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="form-group">
        <h3 style={headStyle}><Text text="modals.resend_confirmation.title" /></h3>
      </fieldset>

      <fieldset className="form-group form-group_btns">
        <LaddaButton
          className="btn btn-primary btn-block"
          data-style={SLIDE_UP}
          loading={buttonState}
          type="submit" >
          <Text text="modals.resend_confirmation.resend_email" />
        </LaddaButton>
      </fieldset>
    </form>
  )
}

ResendConfirmationEmailForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  buttonState: PropTypes.bool.isRequired
}

// a unique identifier for this form
export default reduxForm({
  form: 'resendconfirmationemail'
})(ResendConfirmationEmailForm)
