require('../../styles/quoteSpecifics.scss');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
import EnquiryBar from '../../components/EnquiryBar';
import moment from 'moment';

class QuoteSpecifics extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEtaChange = this.onEtaChange.bind(this);
    this.onEtdChange = this.onEtdChange.bind(this);
    this.selectPort = this.selectPort.bind(this);
    let eta = this.props.state.deals.active.deal.eta ? moment(this.props.state.deals.active.deal.eta) : null;
    let etd = this.props.state.deals.active.deal.etd ? moment(this.props.state.deals.active.deal.etd) : null;
    this.state = {
      eta: eta,
      etd: etd
    }
  }

  componentDidMount() {
    const {state} = this.props;
    window.scrollTo(0, 0)
    if (state.deals.active.deal.sent) {
      browserHistory.push('/viewQuotes');
    };
  }

  handleSubmit() {
    const {state, actions} = this.props;
    const deal = state.deals.active.deal;
    const form = getValues(state.form.quote);
    form.port = deal.port;
    form.suppliers = deal.suppliers;
    if (!this.state.etd) {
      form.etd = null;
    } else {
      form.etd = this.state.etd.format('YYYY-MM-DD').toString();
    };
    try {
      form.eta = this.state.eta.format('YYYY-MM-DD').toString();
      form.imo = '9732606';
      form.loa = '300';
      form.grossTonnage = '94300';
      actions.setDeal(form);
      browserHistory.push('/suppliers');
    } catch(err) {
      alert('Please enter ETA');
    }
  }

  onEtaChange(date) {
    if (this.state.eta && this.state.etd && this.state.etd < date) {
      alert('ETD must be later than ETA');
    } else {
      this.setState({eta:date});
    }
  }

  onEtdChange(date) {
    if (this.state.eta &&  this.state.eta > date && date) {
      alert('ETD must be later than ETA');
    } else {
      this.setState({etd:date});
    }
  }

  selectPort(event) {
    const {actions} = this.props;
    actions.fetchGetSuppliers(event.target.value);
  }

  render() {
    const {state, actions} = this.props;
    return (
      <div>
        <EnquiryBar />
        <div className="main-app-container">
          <div className="layout-container">
            <QuoteForm 
              onSubmit={this.handleSubmit} 
              selectPort={this.selectPort}
              port={state.deals.active.deal.port}
              onEtdChange={this.onEtdChange} 
              onEtaChange={this.onEtaChange} 
              eta={this.state.eta}
              etd={this.state.etd}
              deal={state.deals.active.deal}/>
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
)(QuoteSpecifics);
