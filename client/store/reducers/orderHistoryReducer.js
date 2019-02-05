export default function reducer (state = {}, action) {
  switch (action.type) {
  case 'GET_ORDERS': {
    return {...state};
  }
  case 'GET_ORDERS_FULFILLED': {
    return {
      ...state,
      ...action.result
    };
  }
  case 'GET_ORDERS_REJECTED': {
    return {
      ...state
    };
  }
  case 'LOGOUT': {
    for (const key in state) {
      delete state[key];
    }

    return {
      ...state
    };
  }
  }

  return state;
}

