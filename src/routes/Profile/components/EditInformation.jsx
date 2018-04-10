import React, { PropTypes} from 'react'
import { Field, reduxForm } from 'redux-form'
import ReactLadda, { SLIDE_UP } from 'react-ladda'
import Text from '../../../containers/Text'
import UpdatePassword from '../../../containers/Modals/UpdatePasswordContainer'
import CardDialog from '../../../components/Modals/Payment/CardDialog'
import FieldRenderer from '../../../forms/FieldRenderer/'

// TODO onChange is not updating correctly, FIX!
// TODO pass proper selectCard action to CardDialog

class EditInformation extends React.Component {
  constructor(props) {
    super(props)
    this.showUpdatePasswordModal = this.showUpdatePasswordModal.bind(this)
  }

  componentDidMount() {
    this.handleInitialize()
  }

  showUpdatePasswordModal(e) {
    const { show } = this.props

    show('updatepassword')
    e.preventDefault()
  }

  handleInitialize() {
    /*eslint-disable */
    const initData = {
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      email: this.props.user.email,
      phone_number: this.props.user.phone_number,
      street_address: this.props.user.street_address,
      zipcode: this.props.user.zipcode,
      city: this.props.user.city
    }
    /*eslint-enable */
    this.props.initialize(initData)
  }

  render() {
    const {
      formSubmitting,
      handleSubmit,
      pristine,
      submitting,
      isEditingProfile,
      addCard,
      cards,
      getCards,
      loaded,
      onCardAdd,
      selectCard,
      selectedCard,
      user
    } = this.props

    return (
      <div className="edit-information max-width">
        <UpdatePassword />
        <form onSubmit={handleSubmit}>
          <div className="color-bg-white pas pam-tablet pal-desktop mbl">
            <div className="edit-information__section">
              <h4 className="edit-information__section-title">
                <Text text="pages.profile.edit_form.title" />
              </h4>
            </div>

            <div className="flex-row flex-col-mobile">
              <Field
                className="input-text flex"
                component={FieldRenderer}
                name="first_name"
                placeholder={Text.t('pages.profile.edit_form.first_name')}
                type="text" />
              <Field
                className="input-text flex"
                component={FieldRenderer}
                name="last_name"
                placeholder={Text.t('pages.profile.edit_form.last_name')}
                type="text" />
            </div>

            <div className="flex-row flex-col-mobile">
              <Field
                className="input-text flex"
                component={FieldRenderer}
                name="email"
                placeholder={Text.t('pages.profile.edit_form.email')}
                type="email" />
              <Field
                className="input-text flex"
                component={FieldRenderer}
                name="phone_number"
                placeholder={Text.t('pages.profile.edit_form.phone')}
                type="text" />
            </div>

            <div className="flex-row flex-col-mobile">
              <Field
                className="input-text flex"
                component={FieldRenderer}
                name="street_address"
                placeholder={Text.t('pages.profile.edit_form.street_address')}
                type="text" />
              <Field
                className="input-text flex"
                component={FieldRenderer}
                name="zipcode"
                placeholder={Text.t('pages.profile.edit_form.zip')}
                type="text" />
            </div>

            <div className="flex-row flex-col-mobile">
              <Field
                className="input-text flex"
                component={FieldRenderer}
                name="city"
                placeholder={Text.t('pages.profile.edit_form.city')}
                type="text" />
              <div className="flex ptm mht">
                <button
                  className="pl-btn-grey mtt"
                  // eslint-disable-next-line
                  onClick={this.showUpdatePasswordModal}
                  style={{ position: 'relative', top: '-27px' }}>
                  <i className="fa fa-plus" />
                  <Text text="pages.profile.edit_form.change_password" />
                </button>
              </div>
            </div>

            <div className="mtm">
              <div className="edit-information__section">
                <h4 className="edit-information__section-title">
                  <Text text="pages.profile.edit_form.payment_title" />
                </h4>
              </div>
              <div className="flex">
                <CardDialog
                  addCard={addCard}
                  cards={cards}
                  getCards={getCards}
                  isProfile={true}
                  loaded={loaded}
                  onCardAdd={onCardAdd}
                  selectCard={selectCard}
                  selectedCard={selectedCard}
                  user={user} />
                {loaded && <i
                  className="fa fa-refresh fa-spin fa-1x fa-fw"
                  style={{ width: '100%', fontSize: '2rem' }} />
                }
              </div>
            </div>
          </div>

          <div className="flex-row flex-hc">
            {formSubmitting ?
              <i className="fa fa-refresh fa-spin fa-1x fa-fw" /> :
              <ReactLadda
                className="pl-btn-primary"
                data-style={SLIDE_UP}
                disabled={pristine || submitting}
                loading={isEditingProfile}
                type="submit">
                <Text text="pages.profile.edit_form.save" />
              </ReactLadda>
            }
          </div>
        </form>
      </div>
    )
  }
}

EditInformation.propTypes = {
  show: PropTypes.func.isRequired,
  formSubmitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  isEditingProfile: PropTypes.bool.isRequired,
  addCard: PropTypes.func.isRequired,
  // eslint-disable-next-line
  cards: PropTypes.array,
  getCards: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  onCardAdd: PropTypes.func,
  selectCard: PropTypes.func.isRequired,
  selectedCard: PropTypes.string,
  user: PropTypes.object.isRequired,
  initialize: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'editinformation'
})(EditInformation)
