require('../../styles/quoteSpecifics.scss');

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {reduxForm, getValues, addArrayValue} from 'redux-form';
import { browserHistory } from 'react-router';
import DatePicker from 'react-datepicker';
import FormMessages from 'redux-form-validation';
import {generateValidation} from 'redux-form-validation';
import PlusImg from '../../assets/img/add-plus-button.png';
import QuoteForm from './components/QuoteForm';

class QuoteSpecifics extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEtaChange = this.onEtaChange.bind(this);
    this.onEtdChange = this.onEtdChange.bind(this);
    this.state = {
      eta: null,
      etd: null
    }
  }

  componentDidMount() {
    const {state} = this.props;
    if (state.deals.deal.suppliers.length <= 0) {
      browserHistory.push('/suppliers');
    }
  }

  handleSubmit() {
    const {state, actions} = this.props;
    const deal = state.deals.deal;
    const form = getValues(state.form.quote);
    form.port = deal.port;
    form.suppliers = deal.suppliers;
    if (confirm("Clicking OK will send this request to "+deal.suppliers.length.toString()+" suppliers")) {
      try {
        form.eta = this.state.eta.format('DD/MM/YYYY').toString();
        form.etd = this.state.etd.format('DD/MM/YYYY').toString();
        actions.setDeal(form);
        actions.fetchCreateQuotes(form);
        browserHistory.push('/viewQuotes');
      } catch(err) {
        alert('Please enter ETA');
      }
    };
  }

  onEtaChange(date) {
    this.setState({eta:date})
  }

  onEtdChange(date) {
    this.setState({etd:date})
  }

  render() {
    const {state, actions} = this.props;
    return (
      <div className="layout-container">
        <QuoteForm 
          onSubmit={this.handleSubmit} 
          onEtdChange={this.onEtdChange} 
          onEtaChange={this.onEtaChange} 
          eta={this.state.eta}
          etd={this.state.etd}/>
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
)(QuoteSpecifics);
