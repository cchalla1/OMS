export default function reducer (state = {}, action) {
  switch (action.type) {
  case 'GET_CURRENT_ORDER': {
    return {...state};
  }
  case 'GET_CURRENT_ORDER_FULFILLED': {
    return {
      ...state,
      ...action.result
    };
  }
  case 'GET_CURRENT_ORDER_REJECTED': {
    return {
      ...state
    };
  }
  case 'CREATE_OR_UPDATE_ORDER': {
    return {...state};
  }
  case 'CREATE_OR_UPDATE_ORDER_FULFILLED': {
    return {
      ...state,
      ...action.result
    };
  }
  case 'CREATE_OR_UPDATE_ORDER_REJECTED': {
    return {
      ...state
    };
  }
  case 'SUBMIT_ORDER': {
    return {...state};
  }
  case 'SUBMIT_ORDER_FULFILLED': {
    return {
      ...state,
      ...action.result
    };
  }
  case 'SUBMIT_ORDER_REJECTED': {
    return {
      ...state
    };
  }
  case 'LOGOUT': {
    return {
      ...state,
      shoppingCart: null,
      status: null,
      _id: null,
      total: null
    };
  }
  }

  return state;
}
