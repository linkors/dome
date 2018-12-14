import { GET_REVIEW_SUCCESS, RESET_REVIEWS, GET_REVIEW_FINISHED, GET_REVIEW_START } from '../constants/actionTypes';
import reviewsApi from '../api/reviewsApi';
import usersApi from '../api/usersApi';
import { getUsersSuccess } from './userActions';

export function getReviewStart() {  
    return {type: GET_REVIEW_START};
}
export function getReviewSuccess(houseId, review) {  
    return {type: GET_REVIEW_SUCCESS, payload: {houseId, review}};
}
export function getReviewIsFinished() {  
  return {type: GET_REVIEW_FINISHED};
}
export function resetReviews() {  
  return {type: RESET_REVIEWS};
}


export function loadReview(id, houseId) {  
  return function(dispatch) {
    return reviewsApi.getReview(id).then(review => {
      return usersApi.getUser(review.authorId).then((user) => {
        dispatch(getUsersSuccess(user));
        dispatch(getReviewSuccess(houseId, review));
      })
    }).catch(error => {
      throw(error);
    });
  };
}