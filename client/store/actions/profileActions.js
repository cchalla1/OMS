import {makeApiCall} from '../../wapi/api';

export function registerProfile (profile) {

  return function (dispatch) {
    dispatch({type: 'REGISTER_PROFILE'});
    // Remove this before every register request made
    window.localStorage.removeItem('BearerToken');
    fetch(makeApiCall().getRequest(profile, {url: '/api/register', method: 'POST'}))
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            // Save it to local storage
            window.localStorage.setItem('BearerToken', data.user.token);
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

export function getCurrentProfile () {

  return function (dispatch) {
    dispatch({type: 'GET_PROFILE'});
    // Remove this before every register request made
    // window.localStorage.removeItem('BearerToken');
    fetch(makeApiCall().getRequest(null, {url: '/api/profile/current', method: 'GET'}))
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            // Save it to local storage
            window.localStorage.setItem('BearerToken', data.profile.token);
            dispatch({type: 'GET_PROFILE_FULFILLED', result: data.profile});
            fetch(makeApiCall().getRequest(null, {url: '/api/order/current', method: 'GET'}))
              .then((response) => {
                if (response.ok) {
                  response.json().then((data) => {
                    dispatch({type: 'GET_CURRENT_ORDER_FULFILLED', result: data});
                  });
                }
                else {
                  dispatch({type: 'GET_CURRENT_ORDER_REJECTED', result: null});
                }
              });
          });
        }
        else {
          response.json().then(() => {
            window.localStorage.removeItem('BearerToken');
            dispatch({type: 'GET_PROFILE_REJECTED', result: {}});
          });
        }
      })
      .catch((err) => {
        window.localStorage.removeItem('BearerToken');
        dispatch({type: 'GET_PROFILE_REJECTED', result: err});
      });
  };

}

export function login (details) {

  return function (dispatch) {
    dispatch({type: 'LOGIN'});
    // Remove this before every login request made
    window.localStorage.removeItem('BearerToken');
    fetch(makeApiCall().getRequest(details, {url: '/api/login', method: 'POST'}))
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            // Save it to local storage
            window.localStorage.setItem('BearerToken', data.user.token);
            dispatch({type: 'LOGIN_FULFILLED', result: data.user});
            fetch(makeApiCall().getRequest(null, {url: '/api/order/current', method: 'GET'}))
              .then((response) => {
                if (response.ok) {
                  response.json().then((data) => {
                    dispatch({type: 'GET_CURRENT_ORDER_FULFILLED', result: data});
                  });
                }
                else {
                  dispatch({type: 'GET_CURRENT_ORDER_REJECTED', result: null});
                }
              });
          });
        }
        else {
          response.json().then(() => {
            window.localStorage.removeItem('BearerToken');
            dispatch({type: 'LOGIN_REJECTED', result: {}});
          });
        }
      })
      .catch((err) => {
        window.localStorage.removeItem('BearerToken');
        dispatch({type: 'LOGIN_REJECTED', result: err});
      });
  };

}

export function logout () {

  return function (dispatch) {
    window.localStorage.removeItem('BearerToken');
    dispatch({type: 'LOGOUT'});
  };
}
