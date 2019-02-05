import {makeApiCall} from '../../wapi/api';

export function getOrderDetails (orderId) {

  return function (dispatch) {
    dispatch({type: 'GET_ORDER_DETAILS'});
    fetch(makeApiCall().getRequest(null, {url: '/api/orders/' + orderId, method: 'GET'}))
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            dispatch({type: 'GET_ORDER_DETAILS_FULFILLED', result: data});
          });
        }
        else {
          dispatch({type: 'GET_ORDER_DETAILS_REJECTED', result: null});
        }
      })
      .catch(() => {
        dispatch({type: 'GET_ORDER_DETAILS_REJECTED', result: null});
      });
  };

}
