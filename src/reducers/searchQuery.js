import { CHANGE_QUERY } from '../constants/actionTypes'

export default (state = '', { type, payload }) => {
    switch (type) {
      case CHANGE_QUERY:
        return payload;
      default:
        return state
    }
  }