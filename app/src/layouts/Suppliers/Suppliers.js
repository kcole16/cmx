require('../../styles/suppliers.scss');

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { browserHistory } from 'react-router'
import Supplier from './components/Supplier';
import EnquiryBar from '../../components/EnquiryBar';
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
    actions.fetchGetSuppliers(state.deals.active.deal.port);
    // if (state.deals.active.deal.sent) {
    //   browserHistory.push('/viewQuotes');
    // };
    if (!state.deals.active.deal.orders.length) {
      browserHistory.push('/quoteSpecifics');
    };
  }

  handleSubmit() {
    const {state, actions} = this.props;
    actions.fetchCreateQuotes(state.deals.active.deal);
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
    let supplierList = state.deals.active.suppliers;
    if (supplierList === undefined) {
      supplierList = [];
    };
    const handleCheck = this.handleCheck;
    const suppliers = supplierList.map(function(supplier, index) {
      let background = '#FFF';
      if (index%2 === 0) {
        background = '#F9F9F9';
      };
      return (
            <Supplier key={index} supplier={supplier} handleCheck={handleCheck} background={background}/>
        );
    });
    const selectedSuppliers = state.deals.active.deal.suppliers.map(function(supplier, index) {
      return (
          <p key={index}>{supplier}  demo@test.com</p>
        );
    });
    let email = null;
    let orders = null;
    const deal = state.deals.active.deal;
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
                    <p style={{marginTop: 15}}>@ {state.deals.active.deal.port} ({state.deals.active.deal.location})</p>
                    <p>ETA {deal.eta ? deal.eta : null}</p>
                    <p>ETD {deal.etd ? deal.etd: null}</p>
                    <p style={{marginTop: 15}}><a>Click here</a> to submit a price.</p>
                    <p style={{marginTop: 15}}>{deal.additionalInfo}</p>
                    <p style={{marginTop: 15}}>Regards,</p>
                    <p style={{marginTop: 15}}>John Smith</p>
                    <p>OilFront Services</p>
                    <p>Tel: +44 5555555555</p>
                    <p>Mob: +44 555555555</p>
                    <p>Email: info@oilfront.com</p>
                    <p>Skype: oilfront</p>
                    <p><a href="www.oilfront.com">www.oilfront.com</a></p> 
                  </div>
    };
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
                <p>Clicking "Submit" below will send an email to the following suppliers:</p>
                {selectedSuppliers}
                {email}
                <div className="request-button" style={{marginTop: 20}}>
                  <button onClick={this.handleSubmit}>Request Quotes</button>
                </div>
              </div>
            </Modal>
            <div className="port-select">
              <label>Port</label>
              <p>{state.deals.active.deal.port}</p>
            </div>
            <div className="titles">
              <div className="title">
                <label>Company</label>
              </div>
              <div className="title">
                <label>Email</label>
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
