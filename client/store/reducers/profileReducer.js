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
  case 'GET_PROFILE': {
    return {...state};
  }
  case 'GET_PROFILE_FULFILLED': {
    return {
      ...state,
      firstName: action.result.firstName,
      lastName: action.result.lastName,
      email: action.result.email
    };
  }
  case 'GET_PROFILE_REJECTED': {
    return {
      ...state,
      firstName: null,
      lastName: null,
      email: null
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
  case 'LOGIN_REJECTED': {
    return {
      ...state,
      firstName: null,
      lastName: null,
      email: null
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
