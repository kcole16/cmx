import { generateRequest } from '../api';
import { browserHistory } from 'react-router'

export const SELECT_PORT = 'SELECT_PORT';
export const ADD_SUPPLIER = 'ADD_SUPPLIER';
export const SET_DEAL = 'SET_DEAL';
export const ADD_QUOTE = 'ADD_QUOTE';
export const GET_SUPPLIERS = 'GET_SUPPLIERS';
export const REMOVE_USER = 'REMOVE_USER';
export const SEND_DEAL = 'SEND_DEAL';
export const GET_DEALS = 'GET_DEALS';
export const CREATE_DEAL = 'CREATE_DEAL';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const CHANGE_ACTIVE_DEAL = 'CHANGE_ACTIVE_DEAL';
export const GET_QUOTES = 'GET_QUOTES';
export const QUOTE_ADD_MODE = 'QUOTE_ADD_MODE';
export const ACCEPT_QUOTE = 'ACCEPT_QUOTE';

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

export function sendDeal(deal) {
  return {
    type: SEND_DEAL,
    deal_id: deal.deal
  };
}

export function getDeals(deals) {
  return {
    type: GET_DEALS,
    deals: deals
  };
}

export function createDeal() {
  return {
    type: CREATE_DEAL
  };
}

export function updateStatus(json) {
  return {
    type: UPDATE_STATUS,
    deal: json.deal,
    status: json.status
  };
}

export function changeActiveDeal(deal) {
  deal.suppliers = [];
  return {
    type: CHANGE_ACTIVE_DEAL,
    deal: deal
  };
}

export function getQuotes(quotes) {
  return {
    type: GET_QUOTES,
    quotes: quotes.quotes
  };
}

export function quoteAddMode(quote) {
  return {
    type: QUOTE_ADD_MODE,
    quote: quote
  };
}

export function acceptQuote(deal) {
  return {
    type: ACCEPT_QUOTE,
    deal: deal
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
      .then(json => dispatch(changeActiveDeal(json.deal)))
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

export function fetchSetSuppliers(deal) {
  const route = '/setSuppliers';
  const payload = {
    deal: deal
  };
  const req = generateRequest('POST', route, payload);
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
      .then(json => dispatch(fetchGetDeals()))
      .catch(err => console.log(err))
  }
}

export function fetchGetDeals() {
  const route = '/getDeals';
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
      .then(json => dispatch(getDeals(json)))
      .catch(err => console.log(err))
  }
}

export function fetchUpdateStatus(deal, status) {
  const route = '/updateStatus';
  const payload = {
    deal: deal,
    status: status
  };
  const req = generateRequest('POST', route, payload);
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
      .then(json => dispatch(updateStatus(json)))
      .catch(err => console.log(err))
  }
}

export function fetchQuotes(deal) {
  const route = '/getQuotes';
  const payload = {
    deal: deal
  };
  const req = generateRequest('POST', route, payload);
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
      .then(json => dispatch(getQuotes(json)))
      .catch(err => console.log(err))
  }
}

export function fetchAddQuote(quote) {
  const route = '/addQuote';
  const payload = {
    quote: quote
  };
  const req = generateRequest('POST', route, payload);
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
      .then(json => dispatch(fetchQuotes(json)))
      .catch(err => console.log(err))
  }
}

export function fetchSaveQuote(quote) {
  const route = '/saveQuote';
  const payload = {
    quote: quote
  };
  const req = generateRequest('POST', route, payload);
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
      .then(json => dispatch(fetchQuotes(json)))
      .catch(err => console.log(err))
  }
}

export function fetchAcceptQuote(quote, deal) {
  const route = '/acceptQuote';
  const payload = {
    quote: quote,
    deal: deal
  };
  const req = generateRequest('POST', route, payload);
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
      .then(json => dispatch(acceptQuote(json)))
      .catch(err => console.log(err))
  }
}

export function fetchActualize(deal, orders) {
  const route = '/actualizeDeal';
  const payload = {
    deal: deal,
    orders: orders
  };
  const req = generateRequest('POST', route, payload);
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
      .then(json => dispatch(fetchGetDeals()))
      .catch(err => console.log(err))
  }
}