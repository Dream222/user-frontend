import React, { PropTypes } from 'react'
import Select2 from 'react-select2-wrapper'
import Text from '../../containers/Text'
import './form-field-sport.css'


// Move to container
const template = (data, sports) => {
  if (data.id) {
    const { text } = data
    const currentSport = sports.filter(sport => sport.sport === data.id)[0]

    return `<i class='icon-${currentSport.sport}'></i>
            <span class='select-one'>${Text.t(text)}</span>`
  }
  return `<span class='select-one'>${data.text}</span>`
}

const valueRenderer = (data, sports) => {
  if (data.id) {
    const { text } = data
    const currentSport = sports.filter(sport => sport.sport === data.id)[0]

    return `<i class='icon-${currentSport.sport}'></i>
            <span class='select-one'>${Text.t(text)}</span>`
  }
  return `<span class='select-one'>${data.text}</span>`
}

const FormFieldSport = ({ sports, param, onChange }) => {
  const modifiedSports = sports.map(sport => (
    { id: sport.sport, key: sport.sport, text: sport.localized_name }
  ))

  let value

  if (param && modifiedSports.length) {
    value = modifiedSports.find(sport => sport.key === param).id
  } else if (modifiedSports.length) {
    value = modifiedSports[0].id
  }

  return (
    <div>
      <Select2
        className="form-control"
        data={modifiedSports}
        name="sport_name"
        onSelect={onChange}
        options={{
          minimumResultsForSearch: 'Infinity',
          escapeMarkup: markup => markup,
          templateResult: option => template(option, sports),
          templateSelection: option => valueRenderer(option, sports),
          placeholder: 'Loading sports',
          dropdownAutoWidth: true
        }}
        style={{ width: '100%' }}
        value={value} />
    </div>
  )
}

FormFieldSport.propTypes = {
  param: PropTypes.string,
  sports: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  onChange: PropTypes.func
}


export default FormFieldSport
