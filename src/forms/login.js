import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import Text from '../containers/Text'
import FieldRenderer from './FieldRenderer'


const LoginForm = props => {
  const {
          facebookLogin,
          isWaitingFacebookResponse,
          onForgotPassword,
          pristine,
          submitting,
          handleSubmit
        } = props

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-modal__password-field flex-row">
        <Field
          className="input-text flex"
          component={FieldRenderer}
          name="email"
          placeholder={Text.t('modals.login.email')}
          type="email" />
      </div>

      <div className="login-modal__password-field flex-row">
        <Field
          className="input-text flex"
          component={FieldRenderer}
          name="password"
          placeholder={Text.t('modals.login.password')}
          type="password" />
        <span className="login-modal__forgot-password t5">
          <a href="#" onClick={onForgotPassword}>
            <Text text="modals.login.forgot_password" />
          </a>
        </span>
      </div>

      <div className="login-modal__buttons flex-row flex-col-mobile mts">
        <button
          className="login-modal__facebook-button flex pl-btn-dark color-bd-primary-brand"
          disabled={isWaitingFacebookResponse}
          onClick={facebookLogin}
          type="button">
          <i className="icon-facebook mrt" />
          <Text text="modals.login.login_fb" />
          <div className="login-modal__buttons-divider">
            <Text text="modals.login.or" />
          </div>
        </button>

        <button
          className="login-modal__login-button flex pl-btn-primary"
          disabled={pristine || submitting}
          type="submit">
          <Text text="modals.login.login" />
        </button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  facebookLogin: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isWaitingFacebookResponse: PropTypes.bool.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
}

// a unique identifier for this form
export default reduxForm({
  form: 'login'
})(LoginForm)
