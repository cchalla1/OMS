import {makeApiCall} from '../../wapi/api';

export function submitOrder (order) {

  return function (dispatch) {
    dispatch({type: 'SUBMIT_ORDER'});
    fetch(makeApiCall().getRequest(order, {url: '/api/order/current', method: 'POST'}))
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            dispatch({type: 'SUBMIT_ORDER_FULFILLED', result: data});
          });
        }
        else {
          dispatch({type: 'SUBMIT_ORDER_REJECTED', result: null});
          // dispatch({type: 'PROFILE_EXPIRED', result: null});
        }
      })
      .catch(() => {
        dispatch({type: 'SUBMIT_ORDER_REJECTED', result: null});
        // dispatch({type: 'PROFILE_EXPIRED', result: null});
      });
  };

}

export function createOrUpdateOrder (order) {

  return function (dispatch) {
    dispatch({type: 'CREATE_OR_UPDATE_ORDER'});
    fetch(makeApiCall().getRequest(order, {url: '/api/order/current', method: 'POST'}))
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            dispatch({type: 'CREATE_OR_UPDATE_ORDER_FULFILLED', result: data});
          });
        }
        else {
          dispatch({type: 'CREATE_OR_UPDATE_ORDER_REJECTED', result: null});
        }
      })
      .catch(() => {
        dispatch({type: 'CREATE_OR_UPDATE_ORDER_REJECTED', result: null});
      });
  };

}
