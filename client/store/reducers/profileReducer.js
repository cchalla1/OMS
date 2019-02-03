export default function reducer (state = {}, action) {
  switch (action.type) {
  case 'REGISTER_PROFILE': {
    return {...state};
  }
  case 'REGISTER_PROFILE_FULFILLED': {
    return {
      ...state,
      firstName: action.result.firstName,
      lastName: action.result.lastName,
      email: action.result.email
    };
  }
  case 'LOGIN': {
    return {...state};
  }
  case 'LOGIN_FULFILLED': {
    return {
      ...state,
      firstName: action.result.firstName,
      lastName: action.result.lastName,
      email: action.result.email
    };
  }
  case 'PROFILE_EXPIRED': {
    return {
      firstName: null,
      lastName: null,
      email: null
    };
  }
  }

  return state;
}
