export default function reducer (state = {}, action) {
  switch (action.type) {
  case 'GET_CURRENT_ORDER': {
    return {...state, orderConfirmed: false};
  }
  case 'GET_CURRENT_ORDER_FULFILLED': {
    return {
      ...state,
      ...action.result,
      orderConfirmed: false
    };
  }
  case 'GET_CURRENT_ORDER_REJECTED': {
    return {
      ...state
    };
  }
  case 'CREATE_OR_UPDATE_ORDER': {
    return {...state, orderConfirmed: false};
  }
  case 'CREATE_OR_UPDATE_ORDER_FULFILLED': {
    return {
      ...state,
      ...action.result,
      orderConfirmed: false
    };
  }
  case 'CREATE_OR_UPDATE_ORDER_REJECTED': {
    return {
      ...state
    };
  }
  case 'SUBMIT_ORDER': {
    return {...state, orderConfirmed: false};
  }
  case 'SUBMIT_ORDER_FULFILLED': {
    return {
      ...state,
      orderConfirmed: true,
      shoppingCart: null,
      status: null,
      _id: null,
      total: null
    };
  }
  case 'SUBMIT_ORDER_REJECTED': {
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
