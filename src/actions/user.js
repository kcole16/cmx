export const STORE_USER = 'STORE_USER';

export function storeUser(user) {
  return {
    type: STORE_USER,
    user: user
  };
}

export function fetchLogin(user) {
  const url = 'https://movements-staging.herokuapp.com/v1/sign_in';
  const obj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache'
    },
    body: JSON.stringify(user)
  };
  return dispatch => {
    return fetch(url, obj)
      .then(res => res.json())
      .then(json => dispatch(storeUser(json)))
  }
}
