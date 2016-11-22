import { 
  STORE_TOKEN,
	STORE_USER,
  REMOVE_USER,
  INCORRECT_LOGIN,
  LOGOUT
} from '../actions/index';

const initialState = {
  access_token: null,
  user_id: null,
  isAuthenticated: false,
  incorrectLogin: false,
  reloaded: false
};

function isUndefined(param) {
  if (param === undefined) {
    return true;
  } else {
    return false;
  }
}

export default function counter(state = initialState, action={}) {
  switch (action.type) {
  case STORE_TOKEN:
    return {
      ...state,
      access_token: action.access_token,
      isAuthenticated: true,
      incorrectLogin: false
    };
  case STORE_USER:
    return {
      ...state,
      role: action.user.role,
      email: action.user.email,
      companyName: action.user.company_name
    };
  case REMOVE_USER:
    return {
      ...state,
      access_token: null,
      isAuthenticated: false
    };
  case INCORRECT_LOGIN:
    return {
      ...state,
      incorrectLogin: true
    };
  case LOGOUT:
    return {
      ...state,
      access_token: null,
      isAuthenticated: false
    };
  default:
    return state;
  }
}
