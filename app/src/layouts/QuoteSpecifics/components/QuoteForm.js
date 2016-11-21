import React, { Component } from 'react';
import {reduxForm, getValues, addArrayValue} from 'redux-form';
import DatePicker from 'react-datepicker';
import FormMessages from 'redux-form-validation';
import {generateValidation} from 'redux-form-validation';
import PlusImg from '../../../assets/img/add-plus-button.png';
import GradeSearch from './GradeSearch';
import VesselSearch from './VesselSearch';

export const fields = ['vessel', 'buyer', 'orderedBy', 'portCallReason', 
    'agent', 'eta', 'etd', 'currency', 'location', 'orders[].grade',
    'orders[].quantity', 'orders[].unit', 'orders[].specification', 
    'orders[].maxSulphur', 'orders[].comments', 'additionalInfo', 'voyage', 'trade'];

const validate = values => {
  const errors = {}
  if (!values.vessel) {
    errors.vessel = 'Required'
  }
  // if (!values.buyer) {
  //   errors.buyer = 'Required'
  // }
  // if (!values.currency) {
  //   errors.currency = 'Required'
  // }
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
    this.state = {
      search: ''
    }
  }

  render() {
    const {deal, pristine, submitting, handleSubmit, onEtaChange, onEtdChange, eta, etd, selectPort, port} = this.props;
    const {fields: {vessel, buyer, orderedBy, portCallReason, voyage, trade, location,
      agent, currency, orders, additionalInfo}} = this.props;
    if (!orders.length && !deal.orders.length) {
      orders.addField({
              grade: '',
              quantity: null,
              unit: 'MT',
              maxSulphur: '0.1%',
              specification: null,
              comments: null
            })
    };
    let imoVal = null;
    let gtVal = null;
    let loaVal = null;
    if (buyer.touched) {
      imoVal = '9681883';
      loaVal = '180';
      gtVal = '24785';
    };
    const portList = [{
      name: 'Gibraltar',
      id: 7
    },{
      name: 'Malta',
      id: 8
    },{
      name: 'Singapore',
      id: 9
    }];
    const ports = portList.map(function(port, index) {
      return (
            <option key={index} id={port.id} value={port.name}>{port.name}</option>
        );
    });
    const search = this.state.search;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <VesselSearch vessel={vessel} />
            <div className="form-data">
              <label>Port<sup>*</sup></label>
              <select className="create-input" style={{height: 34, width: 343}} onChange={selectPort} value={port}>
                {ports}
              </select>
            </div>
            <div className="form-data">
              <label>Location in Port</label>
              <select className="create-input" style={{height: 34, width: 343}} {...location}>
                <option value={null}>Select Location</option>
                <option value="Alongside">Alongside</option>
                <option value="Ex Barge">Ex Barge</option>
                <option value="Ex Wharf">Ex Wharf</option>
                <option value="Ex Pipe">Ex Pipe</option>
                <option value="Road Tanker Wagon">Road Tanker Wagon</option>
                <option value="Anchorage">Anchorage</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-data calendar">
              <label>ETA<sup>*</sup></label>
              <DatePicker
                      selected={eta}
                      onChange={onEtaChange} />
            </div>
            <div className="form-data calendar">
              <label>ETS</label>
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
              <select className="create-input" style={{height: 34, width: 343}} {...portCallReason}>
                <option value={null}>Select Reason</option>
                <option value="Working Cargo">Working Cargo</option>
                <option value="Bunkers Only">Bunkers Only</option>
                <option value="High Seas">High Seas</option>
                <option value="OPL">OPL</option>
              </select>
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
              <label>Grade<sup style={{color: 'red'}}>*</sup></label>
            </div>
            <div className="title">
              <label>Quantity<sup style={{color: 'red'}}>*</sup></label>
            </div>
            <div className="title">
              <label>Unit<sup style={{color: 'red'}}>*</sup></label>
            </div>
            <div className="title">
              <label>Max Sulphur<sup style={{color: 'red'}}>*</sup></label>
            </div>
            <div className="title">
              <label>Specification<sup style={{color: 'red'}}>*</sup></label>
            </div>
            <div className="title">
              <label>Comments</label>
            </div>
          </div>
          <div className="orders">
          {orders.map((order, index) => 
            <div className="order" key={index}>
              <div className="detail">
                <GradeSearch 
                  search={order.grade.value} 
                  onChange={order.grade.onChange} 
                  sulphur={order.maxSulphur.onChange} 
                  spec={order.specification.onChange} />
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
                <select className="create-input" {...order.maxSulphur}>
                  <option value="0.1%">0.1%</option>
                  <option value="0.5%">0.5%</option>
                  <option value="1%">1%</option>
                  <option value="3.5%">3.5%</option>
                </select>
              </div>
              <div className="detail">
                <input className="create-input" placeholder="Specification" {...order.specification}/>
              </div>
              <div className="detail">
                <input className="create-input" placeholder="Comments on this parcel" {...order.comments}/>
              </div>
              <p style={{color: 'red', cursor: 'pointer'}}onClick={() => orders.removeField(index)}>x</p>
            </div>)}
          </div>
          {orders.error && <div className="error">Please enter grade, quantity, units, and specifications</div>}
          <div className="add-order" onClick={() => {
              orders.addField({
                grade: null,
                quantity: null,
                unit: 'MT',
                maxSulphur: '0.1%',
                specification: null,
                comments: null
              })
            }}>
            <div className="add-button">
              <button>+ Add Grade</button>
            </div>
          </div>
          <div className="textarea">
            <label>Additional Info</label>
            <textarea rows={4} {...additionalInfo}/>
          </div>
          <div className="form-row">
            <div className="form-data">
              <label>Voyage Number</label>
              <input type="text" className="create-input" {...voyage}/>
            </div>
            <div className="form-data">
              <label>Trade</label>
              <input type="text" className="create-input" {...trade}/>
            </div>
            <div className="form-data">
              <label>Buyer Name [Full Legal Style]</label>
              <input type="text" className="create-input" {...orderedBy}/>
            </div>
          </div>
          <div className="request-button">
            <button type="submit" disabled={submitting} style={{fontWeight: 500}}>Save Enquiry</button>
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
      initialValues: {...state.deals.active.deal, orderedBy: state.user.companyName}
    }
  } 
)(QuoteForm);
