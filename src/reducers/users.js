import { GET_USER_SUCCESS } from '../constants/actionTypes';

export default (state = {}, { type, payload }) => {
    switch (type) {
        case GET_USER_SUCCESS:
            return {
                ...state,
                [payload.id]: payload
            }
        default:
            return state;
        }
}