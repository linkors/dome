import { GET_ACTIVE_HOUSE_SUCCESS, GET_ACTIVE_HOUSE_START } from '../constants/actionTypes'

export default (state = {data: {}, isLoading: false}, { type, payload }) => {
    switch (type) {
      case GET_ACTIVE_HOUSE_START:
        return {
          ...state,
          isLoading: true
        };
      case GET_ACTIVE_HOUSE_SUCCESS:
        return {
          ...state,
          data: payload,
          isLoading: false,
        };
      default:
        return state
    }
  }