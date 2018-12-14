import { GET_REVIEW_SUCCESS, RESET_REVIEWS, GET_REVIEW_START, GET_REVIEW_FINISHED } from '../constants/actionTypes'

export default (state = {data: {}, averageRating: 0, isLoading: true}, { type, payload }) => {
    switch (type) {
        case GET_REVIEW_START:
            return {
                ...state,
                isLoading: true,
            }
        case GET_REVIEW_SUCCESS:
            const {houseId, review} = payload;
            const currentReviews = state.data[houseId] ? state.data[houseId].contents: [];
            const avgRating = state.data[houseId] ? state.data[houseId].averageRating : 0;

            return {
            ...state,
            data: {
                ...state.data,
                [houseId]: {
                    contents: [...currentReviews, review],
                    averageRating: Math.ceil(((avgRating * currentReviews.length) + review.star) / (currentReviews.length+ 1)),
                }
            }
            
            };
        case GET_REVIEW_FINISHED:
            return {
                ...state,
                isLoading: false,
            }
        case RESET_REVIEWS:
            return {
                ...state,
                data: {},
            }
        default:
            return state
    }
  }