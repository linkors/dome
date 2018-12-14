import { GET_USER_SUCCESS } from '../constants/actionTypes';
import usersApi from '../api/usersApi';

export function getUsersSuccess(user) {  
    return {type: GET_USER_SUCCESS, payload: user};
}

export function loadUser(id) {  
  return function(dispatch) {
    return usersApi.getUser(id).then(user => {
      dispatch(getUsersSuccess(user));
    }).catch(error => {
      throw(error);
    });
  };
}