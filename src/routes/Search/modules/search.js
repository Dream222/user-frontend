// ------------------------------------
// Constants
// ------------------------------------
const MOVE_TO_SEARCH_PAGE = 'MOVE_TO_SEARCH_PAGE'
const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS'
// ------------------------------------
// Actions
// ------------------------------------

export const moveToPage = page => ({
  type: MOVE_TO_SEARCH_PAGE,
  value: page
})

export const actions = {
  moveToPage
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const initialState = {
  pageNumber: 0,
  perPage: 9,
  searchResults: []
}
const ACTION_HANDLERS = {
  [MOVE_TO_SEARCH_PAGE]: (state, action) => ({
    ...state,
    pageNumber: action.value
  }),
  [UPDATE_SEARCH_RESULTS]: (state, action) => ({
    ...state,
    action
  }),
  HANDLE_SEARCHGRID_FORM_SUBMIT: (state, action) => (
    {
      ...state,
      searchResults: action.searchResults || state.searchResults
    })
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function searchReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
