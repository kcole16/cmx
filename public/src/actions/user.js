import { url_base } from '../api';
export const STORE_USER = 'STORE_USER';
export const INCORRECT_LOGIN = 'INCORRECT_LOGIN';

export function storeUser(access_token) {
  return {
    type: STORE_USER,
    access_token: access_token.access_token
  };
}

export function incorrectLogin() {
  return {
    type: INCORRECT_LOGIN
  };
}

export function fetchLogin(user) {
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
      .then((res) => {
        if (res.status >= 400) {
          dispatch(incorrectLogin());
          throw new Error("Incorrect Password");
        } else {
          return res.json();
        };
      })  
      .then(json => dispatch(storeUser(json)))
  }
}
