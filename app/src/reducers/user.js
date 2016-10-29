import { 
	STORE_USER,
  REMOVE_USER,
  INCORRECT_LOGIN
} from '../actions/index';

const initialState = {
  access_token: null,
  user_id: null,
  isAuthenticated: false,
  incorrectLogin: false
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
  case STORE_USER:
    return {
      ...state,
      access_token: action.access_token,
      isAuthenticated: true,
      incorrectLogin: false
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
  default:
    return state;
  }
}