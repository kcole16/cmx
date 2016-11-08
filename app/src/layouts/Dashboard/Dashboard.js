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
      location: 'Anchorage',
      additionalInfo: null,
      orders: [],
      quotes: [],
      status: 'order'
    };
    actions.changeActiveDeal(deal);
    browserHistory.push('/app/quoteSpecifics');
  }

  handleClick(deal) {
    const {actions} = this.props;
    actions.changeActiveDeal(deal);
    actions.fetchQuotes(deal);
    browserHistory.push('/app/quoteSpecifics');
  }

  render() {
    const {state} = this.props;
    const orderList = [{
        vessel: 'Wulin',
        port: 'Singapore',
        eta: '2016-12-02',
        orders: [{
          grade: 'IFO 380'
        }]
    }, {
        vessel: 'Eredine',
        port: 'Singapore',
        eta: '2016-12-04',
        orders: [{
          grade: 'IFO 380'
        }, {
          grade: 'MGO'
        }]
    }];
    const dealList = state.deals.deals ? state.deals.deals : [];
    const handleClick = this.handleClick;
    const enquiries = dealList.map((deal, index) => {
      if (deal.status === 'enquiry') {
        return (
          <Enquiry 
            key={index} 
            deal={deal} 
            handleClick={handleClick} />
        )
      };
    });
    const done = dealList.map((deal, index) => {
      if (deal.status === 'done') {
        return (
          <Enquiry 
            key={index} 
            deal={deal} 
            handleClick={handleClick} />
        )
      };
    });
    const orders = orderList.map((deal, index) => {
      return (
        <Enquiry 
          key={index} 
          deal={deal} 
          handleClick={handleClick} />
      )
    });
    return (
      <div>
        <div className="main-bar dashboard">
          <label className="nav-link active">DASHBOARD</label>
          <label className="nav-link inactive">PRICES</label>
          <label className="nav-link inactive">PORT INFORMATION</label>
          <div className="new-project">
            <button onClick={this.createEnquiry}>+ Create Order</button>
          </div>
        </div>
        <div className="main-app-container">
          <div className="layout-container">
            <div className="enquiries">
              <div className="title">
                <label>Working Enquiries</label>
              </div>
              {enquiries}
              <div className="title">
                <label>Orders</label>
              </div>
              {orders}
              <div className="title">
                <label>Done (not Delivered)</label>
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
