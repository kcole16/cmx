import React, { Component } from 'react';
import {reduxForm, getValues, addArrayValue} from 'redux-form';
import DatePicker from 'react-datepicker';
import FormMessages from 'redux-form-validation';
import {generateValidation} from 'redux-form-validation';
import PlusImg from '../../../assets/img/add-plus-button.png';

export const fields = ['vessel', 'buyer', 'orderedBy', 'portCallReason', 
    'agent', 'eta', 'etd', 'currency', 'location', 'orders[].grade',
    'orders[].quantity', 'orders[].unit', 'orders[].specification', 'orders[].comments', 'additionalInfo'];

const validate = values => {
  const errors = {}
  if (!values.vessel) {
    errors.vessel = 'Required'
  }
  if (!values.buyer) {
    errors.buyer = 'Required'
  }
  if (!values.currency) {
    errors.currency = 'Required'
  }
  // if (!values.orders.length) {
  //   errors.orders = 'Please add at least one order'
  // }
  errors.orders = values.orders.map((order) => {
    if (!order.grade) {
      return 'Please enter grade';
    };
    if (!order.quantity) {
      return 'Please'
    }
  });
  return errors
}

class QuoteForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {deal, pristine, submitting, handleSubmit, onEtaChange, onEtdChange, eta, etd, selectPort, port} = this.props;
    const {fields: {vessel, buyer, orderedBy, portCallReason, 
      agent, currency, orders, additionalInfo}} = this.props;
    if (!orders.length && !deal.orders.length) {
      orders.addField({
              grade: null,
              quantity: null,
              unit: 'MT',
              specification: null,
              comments: null
            })
    };
    let imoVal = null;
    let gtVal = null;
    let loaVal = null;
    if (buyer.touched) {
      imoVal = '9732606';
      loaVal = '300';
      gtVal = '94300';
    };
    const portList = [{
      name: 'Gibraltar',
      id: 7
    },{
      name: 'Malta',
      id: 8
    }];
    const ports = portList.map(function(port, index) {
      return (
            <option key={index} id={port.id} value={port.name}>{port.name}</option>
        );
    });
    return (
      <div>
        <label className="title">Vessel Details</label>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-data">
              <label>Vessel</label>
              <input type="text" placeholder="Search by Vessel" className={vessel.touched && vessel.error ? "error-input" : "create-input"} {...vessel}/>
              {vessel.touched && vessel.error && <div className="error">{vessel.error}</div>}
            </div>
            <div className="form-data">
              <label>Buyer Name</label>
              <input type="text" placeholder="Full Legal Style" className={buyer.touched && buyer.error ? "error-input" : "create-input"} {...buyer}/>
              {buyer.touched && buyer.error && <div className="error">{buyer.error}</div>}
            </div>
            <div className="form-data">
              <label>Broker</label>
              <input type="text" placeholder="(optional)" className="create-input" {...orderedBy}/>
            </div>
          </div>
          <div className="form-row">
            <div className="form-data">
              <label>IMO</label>
              <input type="text" placeholder="Autopopulates from Vessel" className="create-input" value={imoVal}/>
            </div>
            <div className="form-data">
              <label>Gross Tonnage (t)</label>
              <input type="text" placeholder="Autopopulates from Vessel" className="create-input" value={gtVal}/>
            </div>
            <div className="form-data">
              <label>LOA (m)</label>
              <input type="text" placeholder="Autopopulates from Vessel" className="create-input" value={loaVal}/>
            </div>
          </div>
          <label className="title">Requirements</label>
          <div className="form-row">
            <div className="form-data">
              <label>Port</label>
              <select className="create-input" style={{height: 34, width: 343}} onChange={selectPort} value={port}>
                {ports}
              </select>
            </div>
            <div className="form-data">
              <label>Location in Port</label>
              <select className="create-input" style={{height: 34, width: 343}} {...location}>
                <option value="Anchorage">Anchorage</option>
              </select>
            </div>
            <div className="form-data">
            </div>
          </div>
          <div className="form-row">
            <div className="form-data calendar">
              <label>ETA</label>
              <DatePicker
                      selected={eta}
                      onChange={onEtaChange} />
            </div>
            <div className="form-data calendar">
              <label>ETD</label>
              <DatePicker
                      selected={etd}
                      onChange={onEtdChange} />
            </div>
            <div className="form-data">
            </div>
          </div>
          <div className="form-row">
            <div className="form-data">
              <label>Agent</label>
              <input type="text" className="create-input" {...agent}/>
            </div>
            <div className="form-data">
              <label>Port Call Reason</label>
              <input type="text" className="create-input" {...portCallReason}/>
            </div>
            <div className="form-data">
              <label>Currency</label>
              <select className="create-input" style={{height: 34, width: 343}} {...currency}>
                <option value="USD">USD</option>
                <option value="Euro">Euro</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
          <div className="titles">
            <div className="title">
              <label>Grade</label>
            </div>
            <div className="title">
              <label>Quantity</label>
            </div>
            <div className="title">
              <label>Unit</label>
            </div>
            <div className="title">
              <label>Specification</label>
            </div>
            <div className="title">
              <label>Comments</label>
            </div>
          </div>
          <div className="orders">
          {orders.map((order, index) => 
            <div className="order" key={index}>
              <div className="detail">
                <input className="create-input" placeholder="Grade" {...order.grade}/>
              </div>
              <div className="detail">
                <input className="create-input" placeholder="Quantity" {...order.quantity}/>
              </div>
              <div className="detail">
                <select className="create-input" {...order.unit}>
                  <option value="MT">MT</option>
                  <option value="M3">M3</option>
                  <option value="L">L</option>
                </select>
              </div>
              <div className="detail">
                <input className="create-input" placeholder="Specification" {...order.specification}/>
              </div>
              <div className="detail">
                <input className="create-input" placeholder="Comments" {...order.comments}/>
              </div>
            </div>)}
          </div>
          {orders.error && <div className="error">Please enter grade, quantity, units, and specifications</div>}
          <div className="add-order" onClick={() => {
              orders.addField({
                grade: null,
                quantity: null,
                unit: 'MT',
                specification: null,
                comments: null
              })
            }}>
            <img src={PlusImg}/>
            <p>Add Order</p>
          </div>
          <div className="textarea">
            <label>Additional Info</label>
            <textarea rows={4} {...additionalInfo}/>
          </div>
          <div className="request-button">
            <button type="submit" disabled={submitting}>Save Enquiry</button>
          </div>
        </form>
      </div>
    );
  }
}

export default QuoteForm = reduxForm({ 
  form: 'quote',                      
  fields,
  validate},
  (state) => {
    return {
      initialValues: state.deals.deal
    }
  } 
)(QuoteForm);
