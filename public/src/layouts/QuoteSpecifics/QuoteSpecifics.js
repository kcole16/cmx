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
import Modal from 'react-modal';

class QuoteSpecifics extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEtaChange = this.onEtaChange.bind(this);
    this.onEtdChange = this.onEtdChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      eta: null,
      etd: null,
      modalIsOpen: false
    }
  }

  componentDidMount() {
    const {state} = this.props;
    if (state.deals.deal.suppliers.length <= 0) {
      browserHistory.push('/suppliers');
    };
    if (state.deals.deal.orders.length > 0) {
      browserHistory.push('/viewQuotes');
    };
  }

  handleSubmit() {
    const {state, actions} = this.props;
    const deal = state.deals.deal;
    const form = getValues(state.form.quote);
    form.port = deal.port;
    form.suppliers = deal.suppliers;
    if (confirm("Clicking OK will send this request to "+deal.suppliers.length.toString()+" suppliers")) {
      if (!this.state.etd) {
        form.etd = null;
      } else {
        form.etd = this.state.etd.format('DD/MM/YYYY').toString();
      };
      try {
        form.eta = this.state.eta.format('DD/MM/YYYY').toString();
        form.imo = '9732606';
        form.loa = '300';
        form.grossTonnage = '94300';
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

  openModal() {
    const {state} = this.props;
    const form = getValues(state.form.quote)
    if (!this.state.etd) {
      form.etd = null;
    } else {
      form.etd = this.state.etd.format('DD/MM/YYYY').toString();
    };
    try {
      form.eta = this.state.eta.format('DD/MM/YYYY').toString();
      this.setState({modalIsOpen: true})
    } catch(err) {
      alert('Please enter ETA');
    }
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  render() {
    const {state, actions} = this.props;
    const suppliers = state.deals.deal.suppliers.map(function(supplier, index) {
      return (
          <p key={index}>{supplier}</p>
        );
    });
    const form = getValues(state.form.quote);
    let email = null;
    let orders = null;
    if (form) {
      orders = form.orders.map(function(order, index) {
        return (
            <p key={index}>{order.grade} {order.quantity}{order.unit} {order.specification} {order.comments}</p>
          )
      });
      email =  <div className="email">
                    <p>{form.buyer}</p>
                    <p>Bunker Enquiry</p>
                    <p style={{marginTop: 15}}>Please Offer:</p>
                    <p>{form.vessel} (IMO: ) (LOA:  m) (GT:  MT)</p>
                    <div>
                      {orders}
                    </div>
                    <p style={{marginTop: 15}}>@ {state.deals.deal.port}</p>
                    <p>ETA {this.state.eta ? this.state.eta.format('DD/MM/YYYY').toString() : null}</p>
                    <p>ETD {this.state.etd ? this.state.etd.format('DD/MM/YYYY').toString() : null}</p>
                    <p style={{marginTop: 15}}><a>Click here</a> to submit a price.</p>
                    <p style={{marginTop: 15}}>{form.additionalInfo}</p>
                    <p style={{marginTop: 15}}>Best Regards,</p>
                    <p style={{marginTop: 15}}>Mike Ball</p>
                    <p>Manager Bunkers</p>
                    <p>Gearbulk (uk) Ltd., 1. London Bridge, Tooley Street. London SE1 9BG</p>
                    <p>PHONE +44 20 79406909</p>
                    <p>MOBILE +44 7775 822 957</p>
                    <p>Skype mike.ball.gb</p>
                    <p><a href="www.gearbulk.com">www.gearbulk.com</a></p> 
                  </div>
    };
    return (
      <div className="layout-container">
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal">
          <div className="rfq-modal">
            <p>Clicking "Submit" below will send an email to the following suppliers:</p>
            {suppliers}
            {email}
            <div className="request-button" style={{marginTop: 20}}>
              <button onClick={this.handleSubmit}>Request Quotes</button>
            </div>
          </div>
        </Modal>
        <QuoteForm 
          onSubmit={this.openModal} 
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

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '10%',
    right                      : '10%',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'

  }
};