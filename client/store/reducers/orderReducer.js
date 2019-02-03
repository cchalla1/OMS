export default function reducer (state = {}, action) {
  switch (action.type) {
  case 'GET_CURRENT_ORDER': {
    return {...state};
  }
  case 'GET_CURRENT_ORDER_FULFILLED': {
    return {
      ...state,
      order: action.result
    };
  }
  case 'GET_CURRENT_ORDER_REJECTED': {
    return {
      ...state,
      order: null
    };
  }
  }

  return state;
}
