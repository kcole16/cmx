require('../../styles/dashboard.scss');

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {reduxForm, getValues} from 'redux-form';
import { browserHistory, Link } from 'react-router';
import Enquiry from './components/Enquiry';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.createEnquiry = this.createEnquiry.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleActualize = this.handleActualize.bind(this);
  }

  componentWillMount() {
    const {actions} = this.props;
    actions.fetchGetDeals();
  }

  createEnquiry() {
    const {actions} = this.props;
    const deal = {
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
      location: null,
      additionalInfo: null,
      orders: [],
      quotes: [],
      status: null,
      voyage: null,
      trade: null
    };
    actions.changeActiveDeal(deal);
    browserHistory.push('/app/quoteSpecifics');
  }

  handleClick(deal, location) {
    const {actions} = this.props;
    actions.changeActiveDeal(deal);
    actions.fetchQuotes(deal);
    browserHistory.push('/app/'+location);
  }

  handleActualize(deal) {
    const {actions} = this.props;
    actions.changeActiveDeal(deal);
    browserHistory.push('/app/documents');
  }

  render() {
    const {state} = this.props;
    const orderList = [];
    const dealList = state.deals.deals ? state.deals.deals : [];
    const handleClick = this.handleClick;
    const enquiries = dealList.map((deal, index) => {
      if (deal.status === 'enquiry') {
        return (
          <Enquiry 
            key={index} 
            deal={deal} 
            handleClick={handleClick.bind(this, deal, 'viewQuotes')} />
        )
      };
    });
    const done = dealList.map((deal, index) => {
      if (deal.status === 'done') {
        return (
          <Enquiry 
            key={index} 
            deal={deal} 
            handleClick={this.handleActualize.bind(this, deal)}/>
        )
      };
    });
    const orders = dealList.map((deal, index) => {
      if (deal.status === 'order') {
        return (
          <Enquiry 
            key={index} 
            deal={deal}
            handleClick={handleClick.bind(this, deal, 'quoteSpecifics')}  />
        )
      }
    });
    return (
      <div>
        <div className="main-bar dashboard">
          <div className="links">
            <label className="nav-link active">DASHBOARD</label>
            <label className="nav-link inactive">PRICES</label>
            <label className="nav-link inactive">PORT INFORMATION</label>
          </div>
          <div className="new-project">
            <button onClick={this.createEnquiry}>+ Create Order</button>
          </div>
        </div>
        <div className="main-app-container">
          <div className="layout-container">
            <div className="enquiries">
              <div className="title">
                <label>Open Enquiries</label>
              </div>
              {enquiries}
              <div className="title">
                <label>Orders</label>
              </div>
              {orders}
              <div className="title">
                <label>Stemmed</label>
              </div>
              {done}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
