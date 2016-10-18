import { url_base } from '../api';
export const STORE_USER = 'STORE_USER';

export function storeUser(access_token) {
  return {
    type: STORE_USER,
    access_token: access_token.access_token
  };
}

export function fetchLogin(user) {
  console.log(url_base);
  let url = url_base+'/auth';
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
