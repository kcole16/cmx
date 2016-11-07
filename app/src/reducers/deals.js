'use strict'
import { 
	SELECT_PORT,
  ADD_SUPPLIER,
  SET_DEAL,
  ADD_QUOTE,
  GET_SUPPLIERS,
  SEND_DEAL,
  GET_DEALS,
  CREATE_DEAL,
  UPDATE_STATUS,
  CHANGE_ACTIVE_DEAL,
  GET_QUOTES
} from '../actions/index';

const initialState = {
  active: {
    deal: {
      sent: false,
      port: 'Gibraltar',
      suppliers: [],
      vessel: null,
      imo: null,
      loa: null,
      grossTonnage: null,
      buyer: null,
      orderedBy: null,
      eta: null,
      etd: null,
      portCallReason: null,
      agent: null,
      currency: 'USD',
      location: 'Anchorage',
      additionalInfo: null,
      orders: [],
      quotes: [],
      status: 'order'
    },
    suppliers: []
  },
  deals: []
};

function isUndefined(param) {
  if (param === undefined) {
    return true;
  } else {
    return false;
  }
}

export default function deals(state = initialState, action={}) {
  let active = state.active;
  let index = null;
  switch (action.type) {
  case SELECT_PORT:
    active.deal.port = action.port
    return {
      ...state,
      active: active
    };
  case ADD_SUPPLIER:
    const suppliers = active.deal.suppliers;
    index = suppliers.indexOf(action.supplier);
    if (index < 0) {
      suppliers.push(action.supplier);
    } else {
      suppliers.splice(index, 1);
    };
    active.deal.suppliers = suppliers;
    return {
      ...state,
      active: active
    };
  case SET_DEAL:
    active.deal = action.deal
    return {
      active: active
    };
  case ADD_QUOTE:
    let quotes = active.deal.quotes;
    quotes.push(action.quote);
    active.deal.quotes = quotes;
    return {
      ...state,
      active: active
    };
  case GET_SUPPLIERS:
    active.suppliers = action.suppliers
    return {
      ...state,
      active: active
    };
  case SEND_DEAL:
    active.deal.sent = true;
    return {
      ...state, 
      active: active
    }
  case GET_DEALS:
    return {
      ...state, 
      deals: action.deals.deals
    }
  case CREATE_DEAL:
    return {
      active: initialState.active
    }
  case UPDATE_STATUS:
    index = state.deals.indexOf(action.deal);
    let deals = state.deals;
    deals[index].status = action.status;
    return {
      ...state, 
      deals: deals
    }
  case CHANGE_ACTIVE_DEAL:
    active.deal = action.deal;
    active.suppliers = [];
    return {
      ...state,
      active: active
    }
  case GET_QUOTES:
    active.deal.quotes = action.quotes;
    return {
      ...state,
      active: active
    }
  default:
    return state;
  }
}
