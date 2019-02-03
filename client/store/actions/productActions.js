import {makeApiCall} from '../../wapi/api';

export function listProducts () {

  return function (dispatch) {
    dispatch({type: 'LIST_PRODUCTS'});
    fetch(makeApiCall().getRequest(null, {url: '/api/listProducts', method: 'GET'}))
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            dispatch({type: 'LIST_PRODUCTS_FULFILLED', result: data});
          });
        }
        else {
          response.json().then(() => {
            dispatch({type: 'LIST_PRODUCTS_REJECTED', result: {}});
          });
        }
      })
      .catch((err) => {
        dispatch({type: 'LIST_PRODUCTS_REJECTED', result: err});
      });
  };

}

