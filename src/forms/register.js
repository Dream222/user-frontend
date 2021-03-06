import React, { PropTypes } from 'react'
import { Field, FormSection, reduxForm } from 'redux-form'
import Text from '../containers/Text'
import FieldRenderer from './FieldRenderer'


const RegistrationForm = props => {
  const { handleSubmit,
          pristine,
          submitting,
          facebookLogin,
          isWaitingFacebookResponse } = props

  return (
    <form onSubmit={handleSubmit}>
      <FormSection name="user">
        <div className="flex-row flex-col-mobile">
          <Field
            className="input-text flex"
            component={FieldRenderer}
            name="first_name"
            placeholder={Text.t('modals.register.first_name')}
            type="text" />
          <Field
            className="input-text flex"
            component={FieldRenderer}
            name="last_name"
            placeholder={Text.t('modals.register.last_name')}
            type="text" />
        </div>

        <div className="flex-row">
          <Field
            className="input-text flex"
            component={FieldRenderer}
            name="email"
            placeholder={Text.t('modals.register.email')}
            type="email" />
        </div>

        <div className="flex-row">
          <Field
            className="input-text flex"
            component={FieldRenderer}
            name="password"
            placeholder={Text.t('modals.register.password')}
            type="password" />
        </div>

        <div className="flex-row">
          <Field
            className="input-text flex"
            component={FieldRenderer}
            name="password_confirmation"
            placeholder={Text.t('modals.register.password_confirmation')}
            type="password" />
        </div>
      </FormSection>

      <div className="login-modal__buttons flex-row flex-col-mobile mts">
        <button
          className="login-modal__facebook-button flex pl-btn-dark color-bd-primary-brand"
          disabled={isWaitingFacebookResponse}
          onClick={facebookLogin}
          type="button">
          <i className="icon-facebook mrt" />
          <Text text="modals.signup.facebook" />
          <div className="login-modal__buttons-divider">
            <Text text="modals.signup.or" />
          </div>
        </button>
        <button
          className="login-modal__login-button flex pl-btn-primary"
          disabled={pristine || submitting}
          type="submit">
          <Text text="modals.signup.signup" />
        </button>
      </div>
    </form>
  )
}

RegistrationForm.propTypes = {
  facebookLogin: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isWaitingFacebookResponse: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
}

// a unique identifier for this form
export default reduxForm({
  form: 'register'
})(RegistrationForm)
