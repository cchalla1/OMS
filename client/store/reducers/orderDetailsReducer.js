export default function reducer (state = {}, action) {
  switch (action.type) {
  case 'GET_ORDER_DETAILS': {
    return {...state};
  }
  case 'GET_ORDER_DETAILS_FULFILLED': {
    return {
      ...state,
      ...action.result
    };
  }
  case 'GET_ORDER_DETAILS_REJECTED': {
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
