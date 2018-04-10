import { connect } from 'react-redux'
import { Navigation } from '../../components/Navigation'
import { toggleMobileMenu } from '../../actions/menu-actions'
const mapStateToProps = state => ({
  auth: state.auth.authenticated,
  isMobileMenuOpen: state.menu.isMobileMenuOpen
})

const mapDispatchToProps = {
  toggleMobileMenu
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
