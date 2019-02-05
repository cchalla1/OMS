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
  //   case 'LOGOUT': {
  //     return {
  //       ...state,
  //       shoppingCart: null,
  //       status: null,
  //       _id: null,
  //       total: null
  //     };
  //   }
  }

  return state;
}
