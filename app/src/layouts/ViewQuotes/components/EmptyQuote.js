import React, { Component } from 'react';
import {reduxForm, getValues, addArrayValue} from 'redux-form';

export const fields = ['validity', 'orders[].grade',
    'orders[].quantity', 'orders[].unit', 'orders[].spec', 
    'orders[].maxSulphur', 'orders[].comments', 'orders[].price',
    'orders[].delivery','orders[].physical','orders[].terms'];

const validate = values => {
  const errors = {}
  errors.orders = values.orders.map((order, index) => {
    if (!order.price) {
      return 'Please enter grade';
    };
    if (!order.physical) {
      return 'Please'
    };
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
			              <select className="create-input" style={{height: 34, width: 125}} {...order.terms}>
			                <option value="Prepay">Prepay</option>
			                <option value="COD">COD</option>
			                <option value="7 Days Credit">7 Days Credit</option>
			                <option value="14 Days Credit">14 Days Credit</option>
			                <option value="21 Days Credit">21 Days Credit</option>
			                <option value="30 Days Credit">30 Days Credit</option>
			                <option value="45 Days Credit">45 Days Credit</option>
			                <option value="60 Days Credit">60 Days Credit</option>
			              </select>		              
			          </div>
		              <div className="detail">
		                <input className="create-input" placeholder="Physical" {...order.physical}/>
		              </div>
		              <div className="detail">
			              <select className="create-input" style={{height: 34, width: 125}} {...order.delivery}>
							<option name="ExBarge" value="ExBarge">Ex Barge</option>
							<option name="expipe" value="ExPipe">Ex Pipe</option>
							<option name="exwharf" value="ExWharf">Ex Wharf</option>
							<option name="road_tanker" value="RTW">RTW</option>
							<option name="other" value="Other">Other</option>
			              </select>			              
			          </div>
		              <div className="detail">
		                <input className="create-input" placeholder={placeholder} {...order.price}/>
		              </div>
		            </div>
				)
		});
		content = <form onSubmit={handleSubmit}>
					<div className="orders">
						<div className="order">
							<div className="detail">
								<label>Grade<sup>*</sup></label>
							</div>
							<div className="detail">
								<label>Quantity<sup>*</sup></label>
							</div>
							<div className="detail">
								<label>Specs<sup>*</sup></label>
							</div>
							<div className="detail">
								<label>Terms<sup>*</sup></label>
							</div>
							<div className="detail">
								<label>Physical<sup>*</sup></label>
							</div>
							<div className="detail">
								<label>Delivery Method<sup>*</sup></label>
							</div>
							<div className="detail">
								<label>Price<sup>*</sup></label>
							</div>
						</div>
						{ordersList}
					</div>
					<div className="form-row">
						<div className="form-data" style={{marginLeft: 20}}>
						  <label>Validity</label>
						  <input type="text" placeholder="In minutes" className="create-input" {...validity}/>
						</div>
						<div className="request-button" style={{marginRight: 20}}>
							<button type="submit" disabled={submitting}>Save Enquiry</button>
						</div>
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
  	const orders = state.deals.active.deal.orders;
  	for (var order in orders) {
  		if (!orders[order].terms) {
  			orders[order].terms = 'Prepay';
  		};
  		if (!orders[order].delivery) {
  			orders[order].delivery = 'ExBarge';
  		};
  	};
    return {
      initialValues: {orders: state.deals.active.deal.orders, 'validity': ''}
    }
  } 
)(EmptyQuote);
