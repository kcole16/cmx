import { generateRequest } from '../api';

export const SELECT_PORT = 'SELECT_PORT';
export const ADD_SUPPLIER = 'ADD_SUPPLIER';
export const SET_DEAL = 'SET_DEAL';
export const ADD_QUOTE = 'ADD_QUOTE';

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

export function fetchCreateQuotes(deal) {
  const route = '/requestQuotes'
  const req = generateRequest('POST', route, deal);
  return dispatch => {
    return fetch(req.url, req.obj)
      .then(res => res.json())
      // .then(() => dispatch(fetchCampaigns()))
      .catch(err => console.log(err))
  }
}
