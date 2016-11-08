require('../../styles/viewQuotes.scss');

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {reduxForm, getValues} from 'redux-form';
import { browserHistory } from 'react-router';
import Quote from './components/Quote';
import DealSummary from '../../components/DealSummary';
import EnquiryBar from '../../components/EnquiryBar';
import Modal from 'react-modal';
import Pusher from 'pusher-js';

class ViewQuotes extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    this.channel.bind('my_event', function(data) {
      actions.addQuote(data);
    }, this);
    if (state.deals.active.deal.orders.length <= 0) {
      browserHistory.push('/app/quoteSpecifics');
    };
  }

  handleSubmit(index) {
    const { state, actions } = this.props;
    const deal = state.deals.active.deal;
    // const active = this.state.active;
    // const indexOf = active.indexOf(index);
    // if (indexOf > -1) {
    //   active.splice(indexOf, 1);
    // } else {
    //   active.push(index)
    // };
    // this.setState({active: active});
    this.closeModal();
    actions.fetchUpdateStatus(deal, 'done');
    browserHistory.push('/app/documents');
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
    const active = this.state.active;
    const openModal = this.openModal;
    const deal = state.deals.active.deal;
    let quote = this.state.quoteSelected;
    let email = null;
    if (quote.orders) {
      const orders = quote.orders.map((order, index) => {
        return (
            <div key={index} className="order">
              <div className="detail">
                <p>{order.grade}</p>
              </div>
              <div className="detail">
                <p>{order.quantity}{order.unit}</p>
              </div>
              <div className="detail">
                <p>{order.spec}</p>
              </div>
              <div className="detail">
                <p>{order.terms}</p>
              </div>
              <div className="detail">
                <p>{order.delivery}</p>
              </div>
              <div className="detail">
                <p>{order.price} {state.deals.active.deal.currency}</p>
              </div>
            </div>
          );
      })
      const orderComments = state.deals.active.deal.orders.map((order, index) => {
        return (
            <p key={index}>{order.grade}</p>
          )
      });
      const comments = <div className="comments">
                         {orderComments}
                         <p>{quote.info}</p>
                       </div>;
      email = <div className="email">
                <p>{deal.broker ? <p>deal.broker, acting in accordance with instructions received from</p>: null} {deal.buyer}, (hereafter referred to as "Buyers") have placed the following Bunker nomination with {quote.name} (hereafter referred to as "Sellers"):</p>
                <p style={{marginTop: 15}}>Vessel: {deal.vessel}</p>
                <p>Port: {deal.port} ({deal.location})</p>
                <p>ETA: {deal.eta}</p>
                <div className="order" style={{marginTop: 15}}>
                  <div className="detail">
                    <p>Grade:</p>
                  </div>
                  <div className="detail">
                    <p>Quantity:</p>
                  </div>
                  <div className="detail">
                    <p>Specification:</p>
                  </div>
                  <div className="detail">
                    <p>Payment Terms:</p>
                  </div>
                  <div className="detail">
                    <p>Delivery:</p>
                  </div>
                  <div className="detail">
                    <p>Price:</p>
                  </div>
                </div>
                {orders}
                <p style={{marginTop: 15}}>Physical: {quote.orders[0].physical}</p>
                <p style={{marginTop: 15}}>Agent: {deal.agent ? deal.agent : 'TBC'}</p>
                <p style={{marginTop: 15}}>Add Remarks:</p>
                {comments}
                <p style={{marginTop: 15}}>Remarks:</p>
                <p>Fuels shall be a blend of hydrocarbons derived from petroleum refining.</p>
                <p>This shall not preclude small amounts of additives intended to improve some aspects of performance.</p>
                <p>The fuels shall be free of inorganic acids and should not include any added substance or chemical waste which:</p>
                <p>·         jeopardizes the safety of ships or</p>
                <p>·         adversely affects performance of machinery or</p>
                <p>·         is harmful to personnel or</p>
                <p>·         contributes overall to additional air pollution</p>
                <p style={{marginTop: 15}}>This sale is subject to Sellers' General Terms and Conditions which, if not already held by the buyer, are available on
                request to this office.</p>
                <p style={{marginTop: 15}}>Please advise immediately if you feel any of the above terms are incorrect.</p>
                <p style={{marginTop: 15}}>Best Regards,</p>
              </div>;
    };
    const quoteList = supplierList.map(function(supplier, index) {
      let isActive = false;
      if (active.indexOf(index) > -1) {
        isActive = true;
      };
      return (
            <Quote 
              key={supplier.name} 
              index={index}
              quote={supplier} 
              eta={state.deals.active.deal.eta}
              etd={state.deals.active.deal.etd} 
              openModal={openModal} 
              isActive={isActive}
              currency={state.deals.active.deal.currency}/>
        );
    });
    const quotes = <div>
                    <div className="suppliers">
                      {quoteList}
                    </div>
                  </div>;
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
                {email}
                <div className="request-button" style={{marginTop: 20}}>
                  <button onClick={this.handleSubmit}>Send Trade Recap</button>
                </div>
              </div>
            </Modal>
            {quoteList.length > 0 ? quotes : 
              <DealSummary 
              title="Your quotes will appear here!" 
              deal={state.deals.active.deal} />}
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
