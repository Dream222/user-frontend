import React, { PropTypes } from 'react'
import Select2 from 'react-select2-wrapper'

const template = data => {
  const [num, text] = data.text.split(' ')

  return `<span class='select-num'> ${num} </span><span class='select-one'>${text}</span>`
}

const FormFieldDuration = ({ durations, param = 60, onChange }) =>
  <div>
    <Select2
      className="form-control"
      data={durations}
      name="duration"
      options={{
        hideSelectionFromResult: true,
        escapeMarkup: markup => markup,
        minimumResultsForSearch: 'Infinity',
        templateResult: template,
        templateSelection: template
      }}
      onChange={onChange}
      style={{ width: '100%' }}
      value={param} />
  </div>

FormFieldDuration.propTypes = {
  durations: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  param: PropTypes.string
}

export default FormFieldDuration
