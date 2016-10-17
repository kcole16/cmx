import { 
	STORE_USER,
} from '../actions/index';

const initialState = {
  access_token: null,
  user_id: null,
  isAuthenticated: false
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
      access_token: action.access_token,
      isAuthenticated: true
    };
  default:
    return state;
  }
}
