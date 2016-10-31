'use strict'
import { 
	SELECT_PORT,
  ADD_SUPPLIER,
  SET_DEAL,
  ADD_QUOTE,
  GET_SUPPLIERS
} from '../actions/index';

const initialState = {
  deal: {
    port: 'Gibraltar',
    suppliers: [],
    vessel: null,
    imo: null,
    po: null,
    buyer: null,
    vesselType: null,
    requisition: null,
    orderedBy: null,
    eta: null,
    etd: null,
    portCallReason: null,
    agent: null,
    currency: 'USD',
    location: 'Anchorage',
    orders: [],
    quotes: []
  },
  suppliers: []
};

function isUndefined(param) {
  if (param === undefined) {
    return true;
  } else {
    return false;
  }
}

export default function deals(state = initialState, action={}) {
  let deal = state.deal;
  switch (action.type) {
  case SELECT_PORT:
    deal.port = action.port
    return {
      deal: deal,
      ...state
    };
  case ADD_SUPPLIER:
    const suppliers = state.deal.suppliers;
    const index = suppliers.indexOf(action.supplier);
    if (index < 0) {
      suppliers.push(action.supplier);
    } else {
      suppliers.splice(index, 1);
    };
    deal.suppliers = suppliers;
    return {
      ...state,
      deal: deal
    };
  case SET_DEAL:
    return {
      deal: action.deal
    };
  case ADD_QUOTE:
    let quotes = deal.quotes;
    quotes.push(action.quote);
    deal.quotes = quotes;
    return {
      deal: deal
    };
  case GET_SUPPLIERS:
    return {
      ...state,
      suppliers: action.suppliers
    };
  default:
    return state;
  }
}
