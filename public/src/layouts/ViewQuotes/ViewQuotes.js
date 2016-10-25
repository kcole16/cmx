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
    this.state = {
      active: []
    };
  }

  componentDidMount() {
    const {state, actions} = this.props;
    this.channel.bind('my_event', function(data) {
      console.log(data);
      actions.addQuote(data);
    }, this);
    if (state.deals.deal.orders.length <= 0) {
      browserHistory.push('/quoteSpecifics');
    };
  }

  handleSubmit(index) {
    const active = this.state.active;
    const indexOf = active.indexOf(index);
    if (indexOf > -1) {
      active.splice(indexOf, 1);
    } else {
      active.push(index)
    };
    this.setState({active: active});
  }

  render() {
    const {state, actions} = this.props;
    const supplierList = state.deals.deal.quotes;
    const handleSubmit = this.handleSubmit;
    const active = this.state.active;
    const quoteList = supplierList.map(function(supplier, index) {
      let isActive = false;
      if (active.indexOf(index) > -1) {
        isActive = true;
      };
      return (
            <Quote 
              key={index} 
              index={index}
              quote={supplier} 
              eta={state.deals.deal.eta}
              etd={state.deals.deal.etd} 
              handleSubmit={handleSubmit} 
              isActive={isActive}/>
        );
    });
    const quotes = <div>
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
