import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { loadTranslations, syncTranslationWithStore } from 'react-redux-i18n'
import { changeLocale } from '../api/profile-api'

const fi = require('../static/locales/fi.yaml')
const en = require('../static/locales/en.yaml')
// const locales = require('../static/locales/locales.yaml')

class AppContainer extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { routes, store } = this.props

    /*
     i18n configuration
     */

    syncTranslationWithStore(store)
    store.dispatch(loadTranslations({ fi, en }))
    // store.dispatch(loadTranslations(locales));
    const localeFromStorage = localStorage.getItem('locale')
    const locale = (['en', 'fi']).indexOf(localeFromStorage) > -1 ? localeFromStorage : 'fi'
    store.dispatch(changeLocale(locale))

    return (
      <Provider store={store}>
        <div className="flex-col flex">

            <Router
              children={routes}
              history={browserHistory}
              onUpdate={() => window.scrollTo(0, 0)} />

        </div>
      </Provider>
    )
  }
}


AppContainer.propTypes = {
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default AppContainer
