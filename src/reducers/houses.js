import { SORT_HOUSES, 
  ADD_FILTER_HOUSES_STAR, 
  FILTER_HOUSES_NAME, 
  LOAD_HOUSES_START, 
  LOAD_HOUSES_SUCCESS, 
  LOAD_HOUSES_TIME,
  REMOVE_FILTER_HOUSES_STAR
   } from '../constants/actionTypes'


const initialState = {
  isLoading: true,
  executionTime: 0,
  starFilter: [],
  sortBy: '',
  entity: [],
  visibleData: []
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
      case FILTER_HOUSES_NAME:
        return {
          ...state,
          visibleData: state.entity.filter(item => item.name.toLowerCase().indexOf(payload) >= 0),
          isLoading: false,
        };
      case LOAD_HOUSES_START:
        return {
          ...state,
          isLoading: true,
        };
      case LOAD_HOUSES_SUCCESS:
        return {
          ...state,
          entity: payload,
          visibleData: payload,
          isLoading: false,
        };
      case LOAD_HOUSES_TIME:
        return {
          ...state,
          executionTime: payload,
        };
      case ADD_FILTER_HOUSES_STAR:
        return {
          ...state,
          starFilter: [...state.starFilter, payload],
        };
      case REMOVE_FILTER_HOUSES_STAR:
        return {
          ...state,
          starFilter: [
            ...state.starFilter.slice(0, state.starFilter.indexOf(payload)),
            ...state.starFilter.slice(state.starFilter.indexOf(payload) + 1)
          ],
        };
      case SORT_HOUSES:
        return {
          ...state,
          sortBy: payload,
        };
      default:
        return state
    }
  }