import React, { Component } from 'react';
import Countdown from 'react-count-down';
import moment from 'moment';
import Phone from '../../../assets/img/phone-receiver.png';
import Email from '../../../assets/img/message-closed-envelope.png';
import Skype from '../../../assets/img/skype-logo.png';

export default class Quote extends Component {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.editOrder = this.editOrder.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    const quote = this.props.quote;
    this.state = {
    	edit: false,
    	orders: quote.orders
    }
  }

  toggleEdit() {
  	const edit = this.state.edit;
  	if (edit) {
  		this.setState({edit:false});
  	} else {
  		this.setState({edit:true});
  	}
  }

  saveEdit() {
  	const {quote, saveQuote} = this.props;
  	quote.orders = this.state.orders;
  	this.setState({edit: false});
  	saveQuote(quote);
  }

  editOrder(event) {
  	const attr = event.target.name.split('+')[0];
  	const grade = event.target.name.split('+')[1];
  	const order = this.state.orders.find(x => x.grade === grade);
  	const index = this.state.orders.indexOf(order);
  	order[attr] = event.target.value;
  	const state = this.state;
  	state.orders[index] = order;
  	this.setState(state);
  }

  render() {
	const {index, quote, openModal, eta, etd, isActive, currency} = this.props;
	const skypeLink = "skype:dannysoos?chat";
	let commentsExist = false;
	const commentList = quote.orders.map((order, index) => {
		if (order.comments) {
			commentsExist = true;
		};
		return (
				<p key={index}>{order.grade}: {order.comments}</p>
			)
	});
	let orders = [];
	if (this.state.edit) {
		orders = this.state.orders.map((order, index) => {
			return (
					<div className="order">
						<div className="detail">
							<p>{order.grade}</p>
						</div>
						<div className="detail">
							<p>{order.quantity} {order.unit}</p>
						</div>
						<div className="detail">
							<p>{order.maxSulphur}</p>
						</div>
						<div className="detail">
							<input type="text" className="create-input" placeholder="Specs" name={'specs'+'+'+order.grade} value={order.spec} onChange={this.editOrder}/>
						</div>
						<div className="detail">
							<input type="text" className="create-input" placeholder="Terms" name={'terms'+'+'+order.grade} value={order.terms} onChange={this.editOrder}/>
						</div>
						<div className="detail">
							<input type="text" className="create-input" placeholder="Physical" name={'physical'+'+'+order.grade} value={order.physical} onChange={this.editOrder}/>
						</div>
						<div className="detail">
							<input type="text" className="create-input" placeholder="Delivery" name={'delivery'+'+'+order.grade} value={order.delivery} onChange={this.editOrder}/>
						</div>
						<div className="detail">
							<input type="text" className="create-input" placeholder="Price" name={'price'+'+'+order.grade} value={order.price} onChange={this.editOrder}/>
						</div>
					</div>
				)
		});
	} else {
		orders = quote.orders.map((order, index) => {
			return (
					<div className="order">
						<div className="detail">
							<p>{order.grade}</p>
						</div>
						<div className="detail">
							<p>{order.quantity} {order.unit}</p>
						</div>
						<div className="detail">
							<p>{order.maxSulphur}</p>
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
	};
	let validity = moment().add(50, 'minutes').format('MM/DD/YYYY HH:MM A');
    let OPTIONS = { endDate: '11/18/2016 4:30 PM'};
	return (
		<div className="supplier">
			<div className="order-details">
				<div className="order-banner">
					<div className="quote-name">
						<label>{quote.name}</label>
					</div>
					<div className="contact">
						<img src={Phone} />
						<img src={Email} />
						<a href={skypeLink}><img src={Skype} /></a>
					</div>
				</div>
				<div className="order-header">
					<label className="title"></label>
				</div>
				<div className="orders">
					<div className="order">
						<div className="detail">
							<label>Grade</label>
						</div>
						<div className="detail">
							<label>Quantity</label>
						</div>
						<div className="detail">
							<label>Max Sulphur</label>
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
					{orders}
				</div>
				{ commentsExist && quote.info ?
					<div>
					<label className="title">Comments</label>
					<div className="comments">
						{comments}
						<div className="additional-comments">
							<p>{quote.info ? quote.info : null}</p>
						</div>
					</div></div> : null
				}
				<div className="contact">
					<div className="detail">
					</div>
					<div className="detail">
					</div>
					<div className="detail">
					</div>
					<div className="detail">
					</div>
					<div className="request-button edit-button">
						{this.state.edit ? 
						<button onClick={this.toggleEdit}>Cancel</button>: 
						<button onClick={this.toggleEdit}>Edit</button> }
					</div>
					<div className="request-button">
						{this.state.edit ?
						<button onClick={this.saveEdit}>Save</button>:
					  	<button onClick={openModal.bind(this, quote)}>Select Quote</button>
						}
					</div>
				</div>
			</div>
		</div>
	);
  }
}
