import React, { Component } from 'react';
import {reduxForm, getValues, addArrayValue} from 'redux-form';
import DatePicker from 'react-datepicker';
import FormMessages from 'redux-form-validation';
import {generateValidation} from 'redux-form-validation';
import PlusImg from '../../../assets/img/add-plus-button.png';

export const fields = ['vessel', 'imo', 'po', 'buyer', 'vesselType', 'requisition',
    'orderedBy','portCallReason', 'agent', 'currency', 'orders[].quality',
    'orders[].spec', 'orders[].maxSulphur', 'orders[].quantity', 'orders[].unit'];

const validate = values => {
  const errors = {}
  if (!values.vessel) {
    errors.vessel = 'Required'
  }
  if (!values.imo) {
    errors.imo = 'Required'
  }
  if (!values.po) {
    errors.po = 'Required'
  }
  if (!values.buyer) {
    errors.buyer = 'Required'
  }
  if (!values.vesselType) {
    errors.vesselType = 'Required'
  }
  if (!values.requisition) {
    errors.requisition = 'Required'
  }
  if (!values.orderedBy) {
    errors.orderedBy = 'Required'
  }
  if (!values.portCallReason) {
    errors.portCallReason = 'Required'
  }
  if (!values.agent) {
    errors.agent = 'Required'
  }
  if (!values.currency) {
    errors.currency = 'Required'
  }
  return errors
}

class QuoteForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {state, actions, pristine, submitting, handleSubmit, onEtaChange, onEtdChange, eta, etd} = this.props;
    const {fields: {vessel, imo, po, buyer, vesselType, requisition,
      orderedBy,portCallReason, agent, currency, orders}} = this.props;
    return (
      <div>
        <label className="title">Vessel Details</label>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-data">
              <label>Vessel</label>
              <input type="text" className={vessel.touched && vessel.error ? "error-input" : "create-input"} {...vessel}/>
              {vessel.touched && vessel.error && <div className="error">{vessel.error}</div>}
            </div>
            <div className="form-data">
              <label>IMO</label>
              <input type="text" className={imo.touched && imo.error ? "error-input" : "create-input"} {...imo}/>
              {imo.touched && imo.error && <div className="error">{imo.error}</div>}
            </div>
            <div className="form-data">
              <label>PO#</label>
              <input type="text" className={po.touched && po.error ? "error-input" : "create-input"} {...po}/>
              {po.touched && po.error && <div className="error">{po.error}</div>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-data">
              <label>Buyer</label>
              <input type="text" className={buyer.touched && buyer.error ? "error-input" : "create-input"} {...buyer}/>
              {buyer.touched && buyer.error && <div className="error">{buyer.error}</div>}
            </div>
            <div className="form-data">
              <label>Vessel Type</label>
              <input type="text" className={vesselType.touched && vesselType.error ? "error-input" : "create-input"}{...vesselType}/>
              {vesselType.touched && vesselType.error && <div className="error">{vesselType.error}</div>}
            </div>
            <div className="form-data">
              <label>Requisition#</label>
              <input type="text" className={requisition.touched && requisition.error ? "error-input" : "create-input"} {...requisition}/>
              {requisition.touched && requisition.error && <div className="error">{requisition.error}</div>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-data">
              <label>Ordered By</label>
              <input type="text" className={orderedBy.touched && orderedBy.error ? "error-input" : "create-input"} {...orderedBy}/>
              {orderedBy.touched && orderedBy.error && <div className="error">{orderedBy.error}</div>}
            </div>
          </div>
          <label className="title">Requirements</label>
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
              <label>Port Call Reason</label>
              <input type="text" className={portCallReason.touched && portCallReason.error ? "error-input" : "create-input"} {...portCallReason}/>
              {portCallReason.touched && portCallReason.error && <div className="error">{portCallReason.error}</div>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-data">
              <label>Agent</label>
              <input type="text" className={agent.touched && agent.error ? "error-input" : "create-input"} {...agent}/>
              {agent.touched && agent.error && <div className="error">{agent.error}</div>}
            </div>
            <div className="form-data">
              <label>Currency</label>
              <input type="text" className={currency.touched && currency.error ? "error-input" : "create-input"} {...currency}/>
              {currency.touched && currency.error && <div className="error">{currency.error}</div>}
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
          {!orders.length && <div></div>}
          {orders.map((order, index) => 
            <div className="order" key={index}>
              <div className="detail">
                <input className="create-input" {...order.quality}/>
              </div>
              <div className="detail">
                <input className="create-input" {...order.spec}/>
              </div>
              <div className="detail">
                <input className="create-input" {...order.maxSulphur}/>
              </div>
              <div className="detail">
                <input className="create-input" {...order.quantity}/>
              </div>
              <div className="detail">
                <input className="create-input" {...order.unit}/>
              </div>
            </div>)}
          </div>
          <div className="add-order" onClick={() => {
              orders.addField({
                quality: null,
                spec: null,
                maxSulphur: null,
                quantity: null,
                unit: null
              })
            }}>
            <img src={PlusImg}/>
            <p>Add Order</p>
          </div>
          <div className="request-button">
            <button type="submit" disabled={submitting}>Request Quotes</button>
          </div>
        </form>
      </div>
    );
  }
}

export default QuoteForm = reduxForm({ 
  form: 'quote',                      
  fields,
  validate,
})(QuoteForm);
