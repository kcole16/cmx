import {generateRequest} from '../api/index';

export const SAVE_GIVE = 'SAVE_GIVE';
export const SAVE_CORP = 'SAVE_CORP';
export const REMOVE_USER = 'REMOVE_USER';

export function saveGive(transactions) {
  return {
    type: SAVE_GIVE,
    give: transactions.transactions
  };
}

export function saveCorp(transactions) {
  return {
    type: SAVE_CORP,
    corporate: transactions.transactions
  };
}

export function removeUser() {
  return {
    type: REMOVE_USER
  };
}

export function fetchGiveTransactions() {
  const route = '/v1/transactions/give';
  const req = generateRequest('GET', route);
  return dispatch => {
    return fetch(req.url, req.obj)
      .then(res => res.json())
      .then(json => dispatch(saveGive(json)))
  }
}

export function fetchCorpTransactions() {
  const route = '/v1/transactions/corporate';
  const req = generateRequest('GET', route);
  return dispatch => {
    return fetch(req.url, req.obj)
      .then(res => res.json())
      .then(json => dispatch(saveCorp(json)))
  }
}
