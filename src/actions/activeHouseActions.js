import { GET_ACTIVE_HOUSE_SUCCESS, GET_ACTIVE_HOUSE_START } from '../constants/actionTypes';
import { loadReview, getReviewIsFinished, resetReviews, getReviewStart } from './reviewsActions';
import { loadUser } from './userActions';
import housesApi from '../api/housesApi';

export function loadActiveHouseStart() {  
  return {type: GET_ACTIVE_HOUSE_START};
}
export function loadActiveHouseSuccess(house) {  
    return {type: GET_ACTIVE_HOUSE_SUCCESS, payload: house};
}

export function loadHouse(id) {  
  return function(dispatch) {
    dispatch(getReviewStart());
    dispatch(loadActiveHouseStart());
    dispatch(resetReviews());
    return housesApi.getHouse(id).then(house => {
      
      let promises = [];
      promises.push(dispatch(loadUser(house.ownerId)))
      house.reviews.forEach(reviewId => {
        promises.push(dispatch(loadReview(reviewId, house.id)))
      })
      return Promise.all(promises).then(() => {
        dispatch(loadActiveHouseSuccess(house));
        dispatch(getReviewIsFinished());
        
      });
    }).catch(error => {
      throw(error);
    });
  };
}