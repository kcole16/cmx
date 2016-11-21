import React, { Component } from 'react';
import {reduxForm, getValues, addArrayValue} from 'redux-form';

export const fields = ['phone', 'email', 'skype', 'validity', 'orders[].grade',
    'orders[].quantity', 'orders[].unit', 'orders[].spec', 
    'orders[].maxSulphur', 'orders[].comments', 'orders[].price',
    'orders[].delivery','orders[].physical','orders[].terms'];

const validate = values => {
  const errors = {}
  if (!values.phone) {
    errors.phone = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!values.skype) {
    errors.skype = 'Required'
  }
  if (!values.validity) {
    errors.validity = 'Required'
  }
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

class EmptyQuote extends Component {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.state = {
    	edit: false
    }
  }

  toggleEdit() {
  	const {quote, addMode} = this.props;
  	const edit = this.state.edit;
  	if (edit) {
  		this.setState({edit:false});
  	} else {
  		addMode(quote);
  		this.setState({edit:true});
  	}
  }

  render() {
	const {index, quote, eta, etd, currency, handleSubmit, submitting, unit} = this.props;
    const {fields: {phone, email, skype, validity, orders}} = this.props;
    let ordersList = null;
    let content = null;
	if (this.state.edit) {
		ordersList = orders.map((order, index) => {
			const placeholder = "Price ["+order.unit.value+"]";
			return (
		            <div className="order" key={index}>
		              <div className="detail">
		                <input className="create-input" placeholder="Grade" {...order.grade}/>
		              </div>
		              <div className="detail">
		                <input className="create-input" placeholder="Quantity" {...order.quantity}/>
		              </div>
		              <div className="detail">
		                <input className="create-input" placeholder="Specification" {...order.spec}/>
		              </div>
		              <div className="detail">
		                <input className="create-input" placeholder="Terms" {...order.terms}/>
		              </div>
		              <div className="detail">
		                <input className="create-input" placeholder="Physical" {...order.physical}/>
		              </div>
		              <div className="detail">
		                <input className="create-input" placeholder="Delivery" {...order.delivery}/>
		              </div>
		              <div className="detail">
		                <input className="create-input" placeholder={placeholder} {...order.price}/>
		              </div>
		            </div>
				)
		});
		content = <form onSubmit={handleSubmit}>
					<label className="title">Orders</label>
					<div className="orders">
						<div className="order">
							<div className="detail">
								<label>Grade</label>
							</div>
							<div className="detail">
								<label>Quantity</label>
							</div>
							<div className="detail">
								<label>Specs</label>
							</div>
							<div className="detail">
								<label>Terms</label>
							</div>
							<div className="detail">
								<label>Physical</label>
							</div>
							<div className="detail">
								<label>Delivery Method</label>
							</div>
							<div className="detail">
								<label>Price</label>
							</div>
						</div>
						{ordersList}
					</div>
					<label className="title">Contact</label>
					<div className="form-row">
						<div className="form-data">
						  <label>Phone</label>
						  <input type="text" placeholder="Autopopulates from Vessel" className="create-input" {...phone}/>
						</div>
						<div className="form-data">
						  <label>Email</label>
						  <input type="text" placeholder="Autopopulates from Vessel" className="create-input" {...email}/>
						</div>
						<div className="form-data">
						  <label>Skype</label>
						  <input type="text" placeholder="Autopopulates from Vessel" className="create-input" {...skype}/>
						</div>
						<div className="form-data">
						  <label>Validity</label>
						  <input type="text" placeholder="In minutes" className="create-input" {...validity}/>
						</div>
					</div>
					<div className="request-button">
						<button type="submit" disabled={submitting}>Save Enquiry</button>
					</div>
				</form>;
	} else {
		content = null;
	};
	return (
		<div className="supplier">
				<div className="order-details">
					<div className="order-banner" style={{backgroundColor: 'lightgray', color: 'white'}}>
						<div className="quote-name">
							<label>{quote.name}</label>
						</div>
						<div className="waiting">
							<label>Waiting for Quote</label>
							{this.state.edit ? 
								<button onClick={this.toggleEdit}>Cancel</button> : <button onClick={this.toggleEdit}>Add Manually</button> }
						</div>
					</div>
					{content}
				</div>
		</div>
	);
  }
}

export default EmptyQuote = reduxForm({ 
  form: 'emptyQuote',                      
  fields,
  validate},
  (state) => {
    return {
      initialValues: {orders: state.deals.active.deal.orders}
    }
  } 
)(EmptyQuote);
