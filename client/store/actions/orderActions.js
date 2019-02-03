import {makeApiCall} from '../../wapi/api';

export function getCurrentOrder () {

  return function (dispatch) {
    dispatch({type: 'GET_CURRENT_ORDER'});
    fetch(makeApiCall().getRequest(null, {url: '/api/order/current', method: 'GET'}))
      .then((response) => {
        if (response.ok) {
          // dispatch({type: 'REGISTER_PROFILE_FULFILLED', result: JSON.parse(window.localStorage.getItem('currentUser'))});
          response.json().then(() => {
            dispatch({type: 'GET_CURRENT_ORDER_FULFILLED', result: {}});
          });
        }
        else {
          // Remove the token and dispatch an action
          window.localStorage.removeItem('BearerToken');
          dispatch({type: 'GET_CURRENT_ORDER_REJECTED', result: null});
          dispatch({type: 'PROFILE_EXPIRED', result: null});
        }
      })
      .catch(() => {
        // Remove the token and dispatch an action
        window.localStorage.removeItem('BearerToken');
        dispatch({type: 'GET_CURRENT_ORDER_REJECTED', result: null});
        dispatch({type: 'PROFILE_EXPIRED', result: null});
      });
  };

}
