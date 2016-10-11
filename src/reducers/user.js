import { 
	STORE_USER,
  GET_CHARITIES,
  REMOVE_USER
} from '../actions/index';

const initialState = {
  user_id: null
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
  case REMOVE_USER:
    return {
      user_id: null
    };
  case STORE_USER:
    const user = action.user;
    return {
      user_id: user.id,
      email: user.email,
      facebook_id: user.facebook_id,
      auth_token: user.auth_token,
      first_name: user.first_name,
      last_name: user.last_name,
      created_at: user.created_at,
      updated_at: user.updated_at,
      avatar_url: user.avatar_url
    };
  case GET_CHARITIES:
    if (isUndefined(action.charities)) {
      return {
        user_id: null
      }
    };
  default:
    return state;
  }
}
