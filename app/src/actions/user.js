import { url_base } from '../api';
export const STORE_TOKEN = 'STORE_TOKEN';
export const STORE_USER = 'STORE_USER';
export const INCORRECT_LOGIN = 'INCORRECT_LOGIN';
export const LOGOUT = 'LOGOUT';

export function storeToken(access_token) {
  return {
    type: STORE_TOKEN,
    access_token: access_token
  };
}

export function storeUser(user) {
  return {
    type: STORE_USER,
    user: user
  };
}

export function incorrectLogin() {
  return {
    type: INCORRECT_LOGIN
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function fetchUser(token) {
  let url = url_base+'/user';
  const obj = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': 'JWT '+token.access_token
    }
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
      .then(json => dispatch(storeUser(json.user)))
  }
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
      .then(json => dispatch(storeToken(json.access_token)))
      .then(access_token => dispatch(fetchUser(access_token)))
  }
}

export function reload() {
  return dispatch => {
    return dispatch(triggerReload())
      .then(() => location.reload())
  }
}
