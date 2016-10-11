import {configureStore} from '../store/configureStore';

const url_base = 'https://entrywire.fwd.wf';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Cache-Control': 'no-cache'
};

function generateHeaders() {
  const headers = defaultHeaders;
  const store = configureStore();
  const state = store.getState();
  headers.user_id = state.user.user_id;
  headers.auth_token = state.user.auth_token;
  return headers
}

export function generateRequest(method, route, args) {
  const url = url_base+route;
  const obj = {
    method: method,
    headers: generateHeaders()
  };
  if (args) {
    obj.body = JSON.stringify(args);
  };
  return {obj, url};
};
