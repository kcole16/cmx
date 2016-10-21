require('../../styles/viewQuotes.scss');

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {reduxForm, getValues} from 'redux-form';
import { browserHistory } from 'react-router';
import Quote from './components/Quote';
import DealSummary from '../../components/DealSummary';
import Pusher from 'pusher-js';

class ViewQuotes extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.pusher = new Pusher('213331f62067dec74527');
    this.channel = this.pusher.subscribe('test_channel');
  }

  componentDidMount() {
    const {state, actions} = this.props;
    this.channel.bind('my_event', function(data) {
      actions.addQuote(data);
    }, this);
    if (state.deals.deal.orders.length <= 0) {
      browserHistory.push('/quoteSpecifics');
    };
  }

  handleSubmit(quote) {
    const {state, actions} = this.props;
    state.routing.push('/quote', {quote:quote});
  }

  render() {
    const {state, actions} = this.props;
    const supplierList = state.deals.deal.quotes;
    const handleSubmit = this.handleSubmit;
    const quoteList = supplierList.map(function(supplier, index) {
      return (
            <Quote 
              key={index} 
              supplier={supplier} 
              eta={state.deals.deal.eta}
              etd={state.deals.deal.etd} 
              handleSubmit={handleSubmit} />
        );
    });
    const quotes = <div>
                    <div className="titles">
                      <div className="title">
                        <label>Company</label>
                      </div>
                      <div className="title">
                        <label>Price</label>
                      </div>
                      <div className="title">
                        <label>Dates</label>
                      </div>
                      <div className="title">
                        <label>Terms</label>
                      </div>
                      <div className="title">
                        <label>Validity</label>
                      </div>
                      <div className="title">
                      </div>
                    </div>
                    <div className="suppliers">
                      {quoteList}
                    </div>
                  </div>;
    return (
      <div className="layout-container">
        {quoteList.length > 0 ? quotes : 
          <DealSummary 
          title="Your quotes will appear here!" 
          deal={state.deals.deal} />}
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
)(ViewQuotes);
