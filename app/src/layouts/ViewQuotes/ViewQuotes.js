require('../../styles/viewQuotes.scss');

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {reduxForm, getValues} from 'redux-form';
import { browserHistory } from 'react-router';
import Quote from './components/Quote';
import EmptyQuote from './components/EmptyQuote';
import RecapEmail from './components/RecapEmail';
import DealSummary from '../../components/DealSummary';
import EnquiryBar from '../../components/EnquiryBar';
import Modal from 'react-modal';
import Pusher from 'pusher-js';

class ViewQuotes extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.addMode = this.addMode.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveQuote = this.saveQuote.bind(this);
    this.pusher = new Pusher('31409d0487a999b7a26c');
    this.channel = this.pusher.subscribe('test_channel');
    this.state = {
      active: [],
      modalIsOpen: false,
      quoteSelected: {
        name: null
      }
    };
  }

  componentDidMount() {
    const {state, actions} = this.props;
    actions.fetchQuotes(state.deals.active.deal);
    this.channel.bind('my_event', function(data) {
      actions.fetchQuotes(state.deals.active.deal);
    }, this);
    if (state.deals.active.deal.orders.length <= 0) {
      browserHistory.push('/app/quoteSpecifics');
    };
  }

  handleSubmit(index) {
    const { state, actions } = this.props;
    const deal = state.deals.active.deal;
    const quote = this.state.quoteSelected;
    this.closeModal();
    actions.fetchAcceptQuote(quote, deal);
    browserHistory.push('/app/documents');
  }

  handleAdd() {
    const {state, actions} = this.props;
    const form = getValues(state.form.emptyQuote);
    form.id = state.deals.add.id;
    actions.fetchAddQuote(form);
  }

  addMode(quote) {
    const {actions} = this.props;
    actions.quoteAddMode(quote);
  }

  saveQuote(quote) {
    const {actions} = this.props;
    actions.fetchSaveQuote(quote);
  }

  openModal(quote) {
    const {state} = this.props;
    this.setState({
      modalIsOpen: true,
      quoteSelected: quote
    })
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      quoteSelected: {
        name: null
      }
    })
  }

  render() {
    const {state, actions} = this.props;
    const supplierList = state.deals.active.deal.quotes;
    const handleSubmit = this.handleSubmit;
    const handleAdd = this.handleAdd;
    const addMode = this.addMode;
    const active = this.state.active;
    const openModal = this.openModal;
    const saveQuote = this.saveQuote;
    const deal = state.deals.active.deal;
    let quote = this.state.quoteSelected;
    let email = null;
    const filledQuotes = supplierList.map(function(supplier, index) {
      let isActive = false;
      if (active.indexOf(index) > -1) {
        isActive = true;
      };
      if (supplier.expiration !== null) {
        return (
              <Quote 
                key={supplier.name} 
                index={index}
                quote={supplier} 
                eta={state.deals.active.deal.eta}
                etd={state.deals.active.deal.etd} 
                openModal={openModal} 
                saveQuote={saveQuote}
                isActive={isActive}
                currency={state.deals.active.deal.currency}/>
          )
      }
    }); 
    const emptyQuotes = supplierList.map(function(supplier, index) {
      let isActive = false;
      if (active.indexOf(index) > -1) {
        isActive = true;
      };
      if (supplier.expiration === null) {
        return (
              <EmptyQuote 
                key={supplier.name} 
                index={index}
                quote={supplier} 
                eta={state.deals.active.deal.eta}
                etd={state.deals.active.deal.etd} 
                currency={state.deals.active.deal.currency}
                addMode={addMode}
                onSubmit={handleAdd}/>
          )
      }
    });
    return (
      <div>
        <EnquiryBar />
        <div className="main-app-container">
          <div className="layout-container">
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal">
              <div className="rfq-modal">
                <p>Clicking "Submit" below will generate and send the following recap to {quote.name}:</p>
                <RecapEmail quote={quote} deal={deal} />
                <div className="request-button" style={{marginTop: 20}}>
                  <button onClick={this.handleSubmit.bind(this, quote)}>Send Trade Recap</button>
                </div>
              </div>
            </Modal>
            <div className="suppliers">
              {filledQuotes}
              {emptyQuotes}
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
)(ViewQuotes);

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
