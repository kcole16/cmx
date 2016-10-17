require('../../styles/viewQuotes.scss');

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {reduxForm, getValues} from 'redux-form';
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
    const {actions} = this.props;
    this.channel.bind('my_event', function(data) {
      actions.addQuote(data);
    }, this);
  }

  handleSubmit() {
    const {state, actions} = this.props;
    const form = getValues(state.form.login);
    actions.fetchLogin(form);
  }

  render() {
    const {state, actions} = this.props;
    const supplierList = state.deals.deal.quotes;
    const handleSubmit = this.handleSubmit;
    const quoteList = supplierList.map(function(supplier, index) {
      return (
            <Quote key={index} supplier={supplier} handleSubmit={handleSubmit} />
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
                        <label>Expiration</label>
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
