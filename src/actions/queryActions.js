import { CHANGE_QUERY } from '../constants/actionTypes'

export const changeSearchQuery = (payload) => {
    return dispatch => {
      dispatch({
        type: CHANGE_QUERY,
        payload: payload
      })
    }
  }