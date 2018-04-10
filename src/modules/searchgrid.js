import { browserHistory } from 'react-router'
import axios from 'axios'
import apiEndpoints from '../../config/apis'
import toastr from 'toastr'
// ------------------------------------
// Constants
// ------------------------------------
export const HANDLE_SEARCHGRID_FORM_SUBMIT = 'HANDLE_SEARCHGRID_FORM_SUBMIT'

export const onSearchSuccess = searchResults => {
  return {
    type: HANDLE_SEARCHGRID_FORM_SUBMIT,
    searchResults
  }
}

export const onFetching = () => ({
  searching: true,
  type: HANDLE_SEARCHGRID_FORM_SUBMIT
})

// TODO: api
export const getSearchResults = queryParams =>
  axios
    .get(`${apiEndpoints.playven}/search.json`, { params: queryParams })
    .catch(err => toastr.error(err))

// TODO: move to api
export const onSubmit = (e, query) => {
  const queryParams = query ? query : {}

  if (e) {
    e.preventDefault()
    const fields = Array.from(e.target.elements)

    fields
      .filter(v => v.name !== v.value)
      .forEach(v => {
        queryParams[v.name] = v.value
      })
  }


  return dispatch => {
    dispatch(onFetching())
    return getSearchResults(queryParams)
    .then(response => dispatch(onSearchSuccess(response.data.venues)))
    .then(browserHistory.push({ pathname: '/search', query: queryParams }))
  }
}

export const actions = {
  onSubmit
}
