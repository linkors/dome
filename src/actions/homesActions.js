import { LOAD_HOUSES_START, 
  LOAD_HOUSES_SUCCESS, 
  FILTER_HOUSES_NAME, 
  SORT_HOUSES, 
  ADD_FILTER_HOUSES_STAR, 
  REMOVE_FILTER_HOUSES_STAR,
  LOAD_HOUSES_TIME } from '../constants/actionTypes';
import housesApi from '../api/housesApi';
import { loadReview, getReviewIsFinished } from './reviewsActions';
import { loadUser } from './userActions';

export function loadHousesSuccess(HOUSES) {  
  return {type: LOAD_HOUSES_SUCCESS, payload: HOUSES};
}
export function loadHousesStart() {  
  return {type: LOAD_HOUSES_START};
}
export function searchHouse(name) {  
    return {type: FILTER_HOUSES_NAME, payload: name};
}
export function sortHouses(sortBy) {  
  return {type: SORT_HOUSES, payload: sortBy};
}
export function removeFilterHouseStar(filterBy) {  
  return {type: REMOVE_FILTER_HOUSES_STAR, payload: filterBy};
}
export function addFilterHouseStar(filterBy) {  
  return {type: ADD_FILTER_HOUSES_STAR, payload: filterBy};
}
export function setExecutionTime(execTime) {  
  return {type: LOAD_HOUSES_TIME, payload: execTime};
}

export function loadHouses(query) {  
  return function(dispatch) {
    dispatch(loadHousesStart());
    dispatch(setExecutionTime(0));
    let t0 = performance.now();
    return housesApi.getAllHouses().then(houses => {
      if (query && query !== '') {
        let promises = [];
        let filteredHouse = [];
        houses
        .filter(house => house.name.toLowerCase().indexOf(query) >= 0)
        .forEach(house => {
          filteredHouse.push(house);
          house.reviews.forEach(reviewId => {
            promises.push(dispatch(loadReview(reviewId, house.id)));
            promises.push(dispatch(loadUser(house.ownerId)))
          })
        })

        return Promise.all(promises).then(() => {
          dispatch(getReviewIsFinished());
          let t1 = performance.now();
          dispatch(loadHousesSuccess(filteredHouse));
          dispatch(setExecutionTime(t1-t0));
        }) ;
         
      }
    }).catch(error => {
      throw(error);
    });
  };
}