import {makeApiCall} from '../../wapi/api';

export function registerProfile (profile) {

  return function (dispatch) {
    dispatch({type: 'REGISTER_PROFILE'});
    // Remove this before every register request made
    window.localStorage.removeItem('BearerToken');
    // window.localStorage.removeItem('currentUser');
    fetch(makeApiCall().getRequest(profile, {url: '/api/register', method: 'POST'}))
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            // Save it to local storage
            window.localStorage.setItem('BearerToken', data.user.token);
            // window.localStorage.setItem('currentUser', JSON.stringify(data.user));
            dispatch({type: 'REGISTER_PROFILE_FULFILLED', result: data.user});
          });
        }
        else {
          response.json().then(() => {
            dispatch({type: 'REGISTER_PROFILE_REJECTED', result: {}});
          });
        }
      })
      .catch((err) => {
        dispatch({type: 'REGISTER_PROFILE_REJECTED', result: err});
      });
  };

}

export function login (details) {

  return function (dispatch) {
    dispatch({type: 'LOGIN'});
    // Remove this before every login request made
    window.localStorage.removeItem('BearerToken');
    // window.localStorage.removeItem('currentUser');
    fetch(makeApiCall().getRequest(details, {url: '/api/login', method: 'POST'}))
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            // Save it to local storage
            window.localStorage.setItem('BearerToken', data.user.token);
            // window.localStorage.setItem('currentUser', JSON.stringify(data.user));
            dispatch({type: 'LOGIN_FULFILLED', result: data.user});
          });
        }
        else {
          response.json().then(() => {
            dispatch({type: 'LOGIN_REJECTED', result: {}});
          });
        }
      })
      .catch((err) => {
        dispatch({type: 'LOGIN_REJECTED', result: err});
      });
  };

}
