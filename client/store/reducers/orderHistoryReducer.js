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

