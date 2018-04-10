import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import moment from 'moment'
import Text from 'containers/Text'
import LanguageSelector from 'containers/LanguageSelector'
import Buttons from './Buttons'
import ResendConfirmationModal from 'containers/Modals/ResendConfirmationEmail'
import ForgotPassword from 'containers/Modals/ForgotPassword'

const Navigation = ({ theme, toggleMobileMenu, auth, isMobileMenuOpen }) => {
  // make an array of buttons (e.g. <Buttons.Register/><Buttons.Login/>)
  const createButtons = () => {
    const data = {
      Login: !auth,
      Register: !auth,
      Profile: auth,
      Logout: auth
    }

    const mapped = _.reduce(data, (sum, display, name) => {
      if (!display) {
        return sum
      }
      const element = React.createElement(Buttons[name], { key: name })

      return sum.concat(element)
    }, [])

    return _.compact(mapped)
  }

  const renderProfileButtonsLoggedIn = () =>
    <div className="navigation-right-links flex-row flex-hc">
      <Buttons.Profile />
      <Buttons.Logout />
    </div>

  const renderProfileButtonsLoggedOut = () =>
    <div className="navigation-right-links flex-row flex-hc">
      <Buttons.Login />
      <div className="mrs color-white text-uc">
        <Text text="nav.or" />
      </div>
      <Buttons.Register />
    </div>

  const decodeDate = encodeURIComponent(moment().format('DD/MM/YYYY'))
  const nextHour = moment().add(1, 'hour').startOf('hour').format('HHmm')

  return (
    <div className={theme} id="navigation">
      <div className="hide-gt-mobile">
        <div id="navigation-mobile-menu">
          <button
            className="t3 pas"
            id="navigation-toggle"
            onClick={() => toggleMobileMenu()}
            type="button">
            ☰
          </button>
          { isMobileMenuOpen && <div className="mobile-menu-wrapper">
            <div className="navigation-link">
              <Link className="navigation-logo" to="/" />
            </div>
            <Link
              className="navigation-link color-white text-uc"
              to={`/search?date=${decodeDate}&duration=60&sport_name=tennis&time=${nextHour}`}>
              <Text text="nav.venues" />
            </Link>
            <Link
              className="navigation-link color-white text-uc"
              to="https://playven.zendesk.com/hc/fi">
              <Text text="nav.help" />
            </Link>
            <Link
              className="navigation-link color-white text-uc"
              to="https://sales.playven.com/">
              <Text text="nav.sales" />
            </Link>
            {createButtons()}
            </div>
          }
        </div>
      </div>
      <div className="hide-mobile">
        <div id="navigation-menu">
          <div className="flex-row flex-hc mlt-gt-mobile mtm-mobile">
            <Link className="navigation-logo" to="/" />
          </div>
          <div className="navigation-menu-links flex-row flex-hc">
            <Link
              className="navigation-link mll color-white text-uc"
              to={`/search?date=${decodeDate}&duration=60&sport_name=tennis&time=${nextHour}`}>
              <Text text="nav.venues" />
            </Link>
            <Link
              className="navigation-link mll color-white text-uc"
              to="https://playven.zendesk.com/hc/fi">
              <Text text="nav.help" />
            </Link>
            <Link
              className="navigation-link mll color-white text-uc"
              to="https://sales.playven.com/">
              <Text text="nav.sales" />
            </Link>
            <LanguageSelector />
          </div>
          {auth && renderProfileButtonsLoggedIn()}
          {!auth && renderProfileButtonsLoggedOut()}
        </div>
      </div>
      { !auth && <ForgotPassword /> }
      { !auth && <ResendConfirmationModal /> }
    </div>
  )
}

Navigation.propTypes = {
  theme: PropTypes.string,
  toggleMobileMenu: PropTypes.func,
  auth: PropTypes.bool,
  isMobileMenuOpen: PropTypes.bool
}

export default Navigation
