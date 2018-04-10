import axios from 'axios'
import { hide, show } from 'redux-modal'
import apiEndpoints from '../../config/apis'
import setAuthorizationToken from './utils/set-authorization-token'
import jwt from 'jsonwebtoken'
import toastr from 'toastr'
import { change } from 'redux-form'
import { browserHistory } from 'react-router'
import Text from '../containers/Text'
import openPopup from './utils/popup'
import _ from 'lodash'
import errorsToFullMessage from './utils/errors-to-full-message'
import { I18n } from 'react-redux-i18n'

import {
  onLoginSuccess,
  onLoginFail,
  onRegisterFail,
  onRegisterSuccess,
  onResendconfirmationRequest,
  onResendConfirmationSuccess,
  onResendConfirmationFail,
  onLogout,
  onConfirmAccountRequest,
  onConfirmAccountSuccess,
  onConfirmAccountFail,
  onEditProfileRequest,
  onEditProfileSuccess,
  onEditProfileFail,
  togglePasswordUpdate,
  toggleForgotPassword,
  onFacebookLoginStart,
  onFacebookLoginCancel,
  onFacebookLoginFinish
} from '../actions/auth-actions'
import { changeLocale } from './profile-api'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// TODO: move dispatches to 'actions' and keep only ajax calls here

// Todo error handling
// Todo move update, updatePassword to profile-api

export function login(params) {
  return dispatch => {
    const { credentials, onSuccess } = params
    const confirmationModalProps = {
      email: credentials.email
    }

    return axios({
      method: 'POST',
      url: `${apiEndpoints.playven}/authenticate`,
      params: credentials
    }).then(res => {
      const token = res.data.auth_token

      setAuthorizationToken(token)
      dispatch(onLoginSuccess(jwt.decode(token)))
      dispatch(hide('login'))

      if (onSuccess && typeof onSuccess === 'string') {
        dispatch(show(onSuccess))
      }
    })
    .catch(error => {
      let errorMessages = ''

      if (error.response && error.response.status === 401) {
        errorMessages = error.response.data.errors.join(', ')
        toastr.error(errorMessages)
        dispatch(onLoginFail(error.response.data.errors.join(', ')))
      } else if (error.response && error.response.status === 422) {
        let errorResp = ''

        try {
          errorResp = error.response.data.error
        } catch (e) {
          // pass
        }
        if (errorResp === 'unconfirmed_account') {
          dispatch(hide('login'))
          dispatch(show('resendconfirmationemail', confirmationModalProps))
        } else {
          toastr.error(error.response.data.message)
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        toastr.error(error.message)
        dispatch(onLoginFail(error.message))
      }
    })
  }
}

export function logout() {
  return dispatch => {
    setAuthorizationToken()
    dispatch(onLogout())
  }
}

export function register(paramsOrModal) {
  return dispatch => {
    const { credentials, onSuccess } = paramsOrModal
    const confirmationModalProps = {
      email: credentials.user.email
    }

    return axios({
      method: 'POST',
      url: `${apiEndpoints.playven}/users`,
      data: credentials
    }).then(res => {
      const token = res.data.auth_token

      setAuthorizationToken(token)
      dispatch(onRegisterSuccess(jwt.decode(token)))
      dispatch(hide('register'))
      if (onSuccess && typeof onSuccess === 'string') {
        dispatch(show(onSuccess))
      }
    })
    .catch(error => {
      let errorMessages = ''

      if (error.response && error.response.status === 422) {
        let errorResp = ''

        try {
          errorResp = error.response.data.error
        } catch (e) {
          // pass
        }
        if (errorResp === 'unconfirmed_account') {
          dispatch(hide('register'))
          dispatch(show('resendconfirmationemail', confirmationModalProps))
        } else {
          toastr.error(error.response.data.message || error.response.data.errors.join(', '))
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessages = error.message
        toastr.error(errorMessages)
      }

      dispatch(onRegisterFail(errorMessages))
    })
  }
}


export const sendOAuthParamsToSignIn = (params, provider = 'facebook') => dispatch => axios({
  method: 'POST',
      // TODO: change assets to .api as soon as we get devise controller under api namespace
  url: `${apiEndpoints.assets}/auth/${provider}/callback`,
  params
}).then(res => {
  const token = res.data.auth_token

  setAuthorizationToken(token)
  dispatch(onLoginSuccess(jwt.decode(token)))
})
      .catch(error => {
        const { response } = error

        if (response && response.status === 422) {
          toastr.error(error.response.data.message)
        } else {
          // Something happened in setting up the request that triggered an Error
          toastr.error(error.message)
          dispatch(onLoginFail(error.message))
        }
      })
      .then(() => {
        dispatch(onFacebookLoginFinish())
      })


function listenForCredentials(popup, dispatch) {
  if (popup.closed) {
    return dispatch(onFacebookLoginCancel())
  }
  // TODO: ????
  let href = null

  try {
    href = popup.location.search
  } catch (error) {
    // nothing wrong here, still not ready
  }

  if (!href || _.trim(href).length === 0) {
    return setTimeout(() => listenForCredentials(popup, dispatch), 100)
  }

  // ?code=CODEGOESHERE&state=STATEGOESHERE#_=_
  href = _.first(href.substr(1).split('#'))
  const chunks = _.map(href.split('&'), muppet => muppet.split('='))
  const object = _.reduce(chunks, (memo, current) => _.extend(memo, { [current[0]]: current[1] })
  , {})

  popup.close()

  return dispatch(sendOAuthParamsToSignIn(object, 'facebook'))
}


export function facebookLogin() {
  const popup = openPopup('facebook', apiEndpoints.social_signin.facebook, 'Facebook login')

  return dispatch => {
    dispatch(onFacebookLoginStart())
    // ping that child window & ask if tokens are here. While this might be not the "best"
    // redux approach it doesn't spawn hundreds of stores, making dev life happier
    listenForCredentials(popup, dispatch)
  }
}


export const update = (user, userId) => (dispatch, getState) => {
  for (const propName in user) {
    if (!user[propName]) {
      delete user[propName]
    }
  }

  const requestBody = {
    user
  }

  dispatch(onEditProfileRequest())
  return axios({
    method: 'PATCH',
    url: `${apiEndpoints.playven}/users/${userId}`,
    data: requestBody
  }).then(res => {
    if (res.status === 200) {
      setAuthorizationToken(res.data.auth_token)
      dispatch(onEditProfileSuccess(res.data))
      const state = getState()

      toastr.success(state.auth.messages.message)
    } else {
      dispatch(onEditProfileFail(res.data.message))
      const state = getState()

      toastr.error(state.auth.messages.reason)
    }
  }).catch(error => {
    let errorMessages = ''

    if (error.response && error.response.status === 422) {
      errorMessages = error.response.data.errors.join(', ')
    } else {
        // Something happened in setting up the request that triggered an Error
      errorMessages = error.message
    }

    dispatch(onEditProfileFail(errorMessages))
    toastr.error(errorMessages)
  })
}

export function forgotPassword(params) {
  return dispatch => {
    dispatch(toggleForgotPassword())
    return axios({
      method: 'POST',
      // TODO: once we move all controllers to /api scope this can be changed
      // back to apiEndpoints.playven
      url: `${apiEndpoints.assets}/password`,
      data: params
    }).then(() => {
      dispatch(toggleForgotPassword())
      toastr.success(I18n.t('messages.reset_password.successfuly_sent'))
    })
      .catch(error => {
        dispatch(toggleForgotPassword())
        toastr.error(errorsToFullMessage(error.response.data.errors))
      })
  }
}

export function updatePassword(credentials, userId) {
  return dispatch => {
    if (!credentials.current_password) {
      toastr.error(Text.t('messages.errors.enter_current_password'))
      return false
    }

    if (!credentials.password || !credentials.password_confirm) {
      toastr.error(Text.t('messages.errors.fill_all_fields'))
      return false
    }

    if (credentials.password !== credentials.password_confirm) {
      dispatch(change('updatepassword', 'password', ''))
      dispatch(change('updatepassword', 'password_confirm', ''))
      toastr.error(Text.t('messages.errors.password_mismatch'))
      return false
    }

    if (credentials.password.length < 8 || credentials.password_confirm.length < 8) {
      toastr.error(Text.t('messages.errors.short_password'))
      return false
    }

    const reqBody = {
      user: {
        /* eslint-disable */
        current_password: credentials.current_password,
        password: credentials.password,
        password_confirmation: credentials.password_confirm
        /* eslint-enable */
      }
    }

    dispatch(togglePasswordUpdate())

    return axios({
      method: 'PUT',
      url: `${apiEndpoints.playven}/users/${userId}`,
      data: reqBody
    }).then(res => {
      dispatch(togglePasswordUpdate())
      dispatch(hide('updatepassword'))
      toastr.success(res.data.message)
    }).catch(error => {
      dispatch(togglePasswordUpdate())
      toastr.error(error.response.data.message.join(', '))
    })
  }
}

export function resendConfirmationEmail(emailObj) {
  return (dispatch, getState) => {
    dispatch(onResendconfirmationRequest())

    return axios({
      method: 'POST',
      url: `${apiEndpoints.playven}/users/confirm_account_email`,
      data: emailObj
    }).then(res => {
      if (res.status === 201) {
        dispatch(onResendConfirmationSuccess(res.data.message))
        const state = getState()

        toastr.success(state.auth.messages.message)
      } else {
        dispatch(onResendConfirmationFail(res.data.message))
        const state = getState()

        toastr.error(state.auth.messages.reason)
      }
    })
      .catch(error => {
        let errorMessages = ''

        if (error.response && error.response.status === 422) {
          errorMessages = error.response.data.errors.join(', ')
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessages = error.message
        }

        toastr.error(errorMessages)
      })
  }
}

export function confirmAccount(credentials, location) {
  return (dispatch, getState) => {
    // credentials will be null if no password set up required
    if (credentials) {
      if (credentials.password !== credentials.password_confirm) {
        dispatch(change('confirmpassword', 'password', ''))
        dispatch(change('confirmpassword', 'password_confirm', ''))
        toastr.error('Password mismatch')
        return
      }
    }

    const params = credentials ? credentials : {}

    // eslint-disable-next-line
    params.confirmation_token = location.query.confirmation_token
    const queryString = _.reduce(params, (result, v, k) => `${result}&${k}=${v}`, '').substr(1)

    dispatch(onConfirmAccountRequest())
    axios({
      method: 'GET',
      url: `${apiEndpoints.assets}/confirmation?${queryString}`
    }).then(res => {
      if (res.status === 200) {
        const token = res.data.auth_token

        setAuthorizationToken(token)
        dispatch(onConfirmAccountSuccess(res.data.message, jwt.decode(token)))
        const state = getState()

        toastr.success(state.auth.messages.message)
        browserHistory.push('/')
      } else {
        dispatch(onConfirmAccountFail(res.data.errors.join(', ')))
        const state = getState()

        toastr.error(state.auth.messages.reason)
      }
    })
      .catch(error => {
        let errorMessages = ''

        if (error.response && error.response.status === 422) {
          errorMessages = error.response.data.errors.join(', ')
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessages = error.message
        }

        dispatch(onConfirmAccountFail(errorMessages))
        toastr.error(errorMessages)
      })
  }
}
