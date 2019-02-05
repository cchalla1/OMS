import {makeApiCall} from '../../wapi/api';

export function getOrders () {

  return function (dispatch) {
    dispatch({type: 'GET_ORDERS'});
    fetch(makeApiCall().getRequest(null, {url: '/api/orders', method: 'GET'}))
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            dispatch({type: 'GET_ORDERS_FULFILLED', result: data});
          });
        }
        else {
          dispatch({type: 'GET_ORDERS_REJECTED', result: null});
        }
      })
      .catch(() => {
        dispatch({type: 'GET_ORDERS_REJECTED', result: null});
      });
  };

}
