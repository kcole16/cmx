require('../../styles/suppliers.scss');

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { browserHistory } from 'react-router'
import Supplier from './components/Supplier';
import Modal from 'react-modal';

class Suppliers extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      modalIsOpen: false
    }
  }

  componentWillMount() {
    const {state, actions} = this.props;
    actions.fetchGetSuppliers(state.deals.deal.port);
    // if (state.deals.deal.orders.length > 0) {
    //   browserHistory.push('/viewQuotes');
    // };
    // if (state.deals.deal.suppliers.length > 0) {
    //   browserHistory.push('/quoteSpecifics');
    // };
  }

  handleSubmit() {
    const {state, actions} = this.props;
    actions.fetchCreateQuotes(state.deals.deal);
    browserHistory.push('viewQuotes');
  }

  handleCheck(event) {
    const {state, actions} = this.props;
    actions.addSupplier(event.target.value);
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  render() {
    const {state} = this.props;
    let supplierList = state.deals.suppliers;
    if (supplierList === undefined) {
      supplierList = [];
    };
    const handleCheck = this.handleCheck;
    const suppliers = supplierList.map(function(supplier, index) {
      return (
            <Supplier key={index} supplier={supplier} handleCheck={handleCheck}/>
        );
    });
    const selectedSuppliers = state.deals.deal.suppliers.map(function(supplier, index) {
      return (
          <p key={index}>{supplier}  demo@test.com</p>
        );
    });
    let email = null;
    let orders = null;
    const deal = state.deals.deal;
    if (deal) {
      orders = deal.orders.map(function(order, index) {
        return (
            <p key={index}>{order.grade} {order.quantity}{order.unit} {order.specification} {order.comments}</p>
          )
      });
      email =  <div className="email">
                    <p>{deal.buyer}</p>
                    <p>Bunker Enquiry</p>
                    <p style={{marginTop: 15}}>Please Offer:</p>
                    <p>{deal.vessel} (IMO: 9732606) (LOA:  300m) (GT:  94300MT)</p>
                    <div>
                      {orders}
                    </div>
                    <p style={{marginTop: 15}}>@ {state.deals.deal.port} ({state.deals.deal.location})</p>
                    <p>ETA {deal.eta ? deal.eta : null}</p>
                    <p>ETD {deal.etd ? deal.etd: null}</p>
                    <p style={{marginTop: 15}}><a>Click here</a> to submit a price.</p>
                    <p style={{marginTop: 15}}>{deal.additionalInfo}</p>
                    <p style={{marginTop: 15}}>Regards,</p>
                    <p style={{marginTop: 15}}>Richard Butler</p>
                    <p>Teekay Fuel Services</p>
                    <p>Tel:    +44 (0) 207 3891 418</p>
                    <p>Mob:  +44 (0) 777 1389 250</p>
                    <p>Email: richard.butler@teekay.com</p>
                    <p>Skype: rwb2468</p>
                    <p><a href="www.teekay.com">www.teekay.com</a></p> 
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
            {selectedSuppliers}
            {email}
            <div className="request-button" style={{marginTop: 20}}>
              <button onClick={this.handleSubmit}>Request Quotes</button>
            </div>
          </div>
        </Modal>
        <div className="titles">
          <div className="title">
            <label>Company</label>
          </div>
          <div className="title">
            <label>Select</label>
          </div>
        </div>
        <div className="suppliers-select">
          {suppliers}
        </div>
        <div className="request-button" id="suppliers">
          <button onClick={this.openModal}>Request Quotes</button>
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
)(Suppliers);

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
