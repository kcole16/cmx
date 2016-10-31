import { generateRequest } from '../api';

export const SELECT_PORT = 'SELECT_PORT';
export const ADD_SUPPLIER = 'ADD_SUPPLIER';
export const SET_DEAL = 'SET_DEAL';
export const ADD_QUOTE = 'ADD_QUOTE';
export const GET_SUPPLIERS = 'GET_SUPPLIERS';
export const REMOVE_USER = 'REMOVE_USER';
export const SEND_DEAL = 'SEND_DEAL';

export function selectPort(port) {
  return {
    type: SELECT_PORT,
    port: port
  };
}

export function addSupplier(supplier) {
  return {
    type: ADD_SUPPLIER,
    supplier: supplier
  };
}

export function setDeal(deal) {
  deal.quotes = [];
  return {
    type: SET_DEAL,
    deal: deal
  };
}

export function addQuote(quote) {
  return {
    type: ADD_QUOTE,
    quote: quote
  };
}

export function getSuppliers(suppliers) {
  return {
    type: GET_SUPPLIERS,
    suppliers: suppliers.suppliers
  };
}

export function removeUser() {
  return {
    type: REMOVE_USER
  };
}

export function sendDeal() {
  return {
    type: SEND_DEAL
  };
}

export function fetchCreateQuotes(deal) {
  const route = '/requestQuotes'
  const req = generateRequest('POST', route, deal);
  return dispatch => {
    return fetch(req.url, req.obj)
      .then((res) => {
        if (res.status >= 400) {
          dispatch(removeUser());
          throw new Error("Not Logged In");
        } else {
          return res.json();
        };
      })
      .then(() => dispatch(sendDeal()))
      .catch(err => console.log(err))
  }
}

export function fetchGetSuppliers(port) {
  const route = '/getSuppliers?port='+port;
  const req = generateRequest('GET', route);
  return dispatch => {
    return fetch(req.url, req.obj)
      .then((res) => {
        if (res.status >= 400) {
          dispatch(removeUser());
          throw new Error("Not Logged In");
        } else {
          return res.json();
        };
      })      
      .then(json => dispatch(getSuppliers(json)))
      .then(() => dispatch(selectPort(port)))
      .catch(err => console.log(err))
  }
}
