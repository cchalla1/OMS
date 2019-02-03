export default function reducer (state = {}, action) {
  switch (action.type) {
  case 'LIST_PRODUCTS': {
    return {...state};
  }
  case 'LIST_PRODUCTS_FULFILLED': {
    return {
      ...state,
      ...action.result
    };
  }
  }

  return state;
}
