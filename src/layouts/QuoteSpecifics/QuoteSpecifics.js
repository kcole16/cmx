require('../../styles/quoteSpecifics.scss');

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {reduxForm, getValues} from 'redux-form';
import Order from './components/Order';
import PlusImg from '../../assets/img/add-plus-button.png';

class QuoteSpecifics extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addOrder = this.addOrder.bind(this);
    this.state = {
      orders: [{
        quality: null,
        spec: null,
        maxSulphur: null,
        quantity: null,
        unit: null
      }]
    }
  }

  handleSubmit() {
    const {state, actions} = this.props;
    const form = getValues(state.form.login);
    actions.fetchLogin(form);
  }

  addOrder() {
    const order = {
        quality: null,
        spec: null,
        maxSulphur: null,
        quantity: null,
        unit: null
      };
    const orders = this.state.orders;
    orders.push(order);
    this.setState({orders:orders});
  }

  render() {
    const {fields: {vessel, imo, po, buyer, vesselType, requisition,
      orderedBy,eta, etd, portCallReason, agent, currency}} = this.props;
    const orders = this.state.orders.map(function(order) {
      return (
          <Order order={order} />
        );
    });
    return (
      <div className="layout-container">
        <label className="title">Vessel Details</label>
        <div className="form-row">
          <div className="form-data">
            <label>Vessel</label>
            <input type="text" className="create-input" {...vessel}/>
          </div>
          <div className="form-data">
            <label>IMO</label>
            <input type="text" className="create-input" {...imo}/>
          </div>
          <div className="form-data">
            <label>PO#</label>
            <input type="text" className="create-input" {...po}/>
          </div>
        </div>
        <div className="form-row">
          <div className="form-data">
            <label>Buyer</label>
            <input type="text" className="create-input" {...buyer}/>
          </div>
          <div className="form-data">
            <label>Vessel Type</label>
            <input type="text" className="create-input" {...vesselType}/>
          </div>
          <div className="form-data">
            <label>Requisition#</label>
            <input type="text" className="create-input" {...requisition}/>
          </div>
        </div>
        <div className="form-row">
          <div className="form-data">
            <label>Ordered By</label>
            <input type="text" className="create-input" {...orderedBy}/>
          </div>
        </div>
        <label className="title">Requirements</label>
        <div className="form-row">
          <div className="form-data">
            <label>ETA</label>
            <input type="text" className="create-input" {...eta}/>
          </div>
          <div className="form-data">
            <label>ETD</label>
            <input type="text" className="create-input" {...etd}/>
          </div>
          <div className="form-data">
            <label>Port Call Reason</label>
            <input type="text" className="create-input" {...portCallReason}/>
          </div>
        </div>
        <div className="form-row">
          <div className="form-data">
            <label>Agent</label>
            <input type="text" className="create-input" {...agent}/>
          </div>
          <div className="form-data">
            <label>Currency</label>
            <input type="text" className="create-input" {...currency}/>
          </div>
          <div className="form-data">
          </div>
        </div>
        <div className="titles">
          <div className="title">
            <label>Quality</label>
          </div>
          <div className="title">
            <label>Spec</label>
          </div>
          <div className="title">
            <label>Max Sulphur</label>
          </div>
          <div className="title">
            <label>Quantity</label>
          </div>
          <div className="title">
            <label>Unit</label>
          </div>
        </div>
        <div className="orders">
          {orders}
        </div>
        <div className="add-order" onClick={this.addOrder}>
          <img src={PlusImg}/>
          <p>Add Order</p>
        </div>
        <div className="request-button">
          <button onClick={this.handleSubmit}>Request Quotes</button>
        </div>
      </div>
    );
  }
}

QuoteSpecifics = reduxForm({ 
  form: 'quoteSpecifics',                       
  fields: ['vessel', 'imo', 'po', 'buyer', 'vesselType', 'requisition',
    'orderedBy','eta', 'etd', 'portCallReason', 'agent', 'currency']}
)(QuoteSpecifics);

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
