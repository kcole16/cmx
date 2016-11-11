import React, { Component } from 'react';
import {reduxForm, getValues, addArrayValue} from 'redux-form';

export const fields = ['phone', 'email', 'skype', 'validity', 'orders[].grade',
    'orders[].quantity', 'orders[].unit', 'orders[].spec', 
    'orders[].maxSulphur', 'orders[].comments', 'orders[].price',
    'orders[].delivery','orders[].physical','orders[].terms'];

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
	const {index, quote, eta, etd, currency, handleSubmit, submitting} = this.props;
    const {fields: {phone, email, skype, validity, orders}} = this.props;
    let ordersList = null;
    let content = null;
	if (this.state.edit) {
		ordersList = orders.map((order, index) => {
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
		                <input className="create-input" placeholder="Price" {...order.price}/>
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
								<label>Delivery</label>
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
		ordersList = quote.orders.map((order, index) => {
			return (
					<div className="order">
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
							<p>{order.physical}</p>
						</div>
						<div className="detail">
							<p>{order.delivery}</p>
						</div>
						<div className="detail">
							<p>{order.price} {currency}</p>
						</div>
					</div>
				)
		});
		content = <div>
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
								<label>Delivery</label>
							</div>
							<div className="detail">
								<label>Price</label>
							</div>
						</div>
						{ordersList}
					</div>
				</div>
	};
	return (
		<div className="supplier">
				<div className="order-details">
					<div className="order-banner" style={{backgroundColor: 'lightgray', color: 'white'}}>
						<label>{quote.name}</label>
						{this.state.edit ? 
							<button onClick={this.toggleEdit}>Cancel</button> : <button onClick={this.toggleEdit}>Edit</button> }
					</div>
					{content}
				</div>
		</div>
	);
  }
}

export default EmptyQuote = reduxForm({ 
  form: 'emptyQuote',                      
  fields},
  (state) => {
    return {
      initialValues: {orders: state.deals.active.deal.orders}
    }
  } 
)(EmptyQuote);
