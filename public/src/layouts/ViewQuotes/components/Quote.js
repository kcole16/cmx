require('../../../styles/viewQuotes.scss');

import React, { Component } from 'react';

export default class Quote extends Component {
  render() {
	const {index, quote, handleSubmit, eta, etd, isActive} = this.props;
	const prices = quote.orders.map((order, index) => {
		return (
				<p key={index}>{order.price}</p>
			)
	});
	const terms = quote.orders.map((order, index) => {
		return (
				<p key={index}>{order.terms}</p>
			)
	});
	const delivery = quote.orders.map((order, index) => {
		return (
				<p key={index}>{order.delivery}</p>
			)
	});
	const orders = quote.orders.map((order, index) => {
		return (
				<div className="order">
					<div className="detail">
						<p>{order.grade}</p>
					</div>
					<div className="detail">
						<p>{order.quantity}{order.unit}</p>
					</div>
					<div className="detail">
						<p>{order.specifications}</p>
					</div>
					<div className="detail">
						<input type="text" placeholder={order.price} style={{marginLeft: 0}}/>
					</div>
					<div className="detail">
						<p>{order.comments}</p>
					</div>
					<div className="detail">
						<p>{order.terms}</p>
					</div>
					<div className="detail">
						<p>{order.delivery}</p>
					</div>
				</div>
			)
	});
	let details = null;
	if (isActive) {
		details = <div className="order-details">
						<div className="order-banner">
							<label>Quote Details</label>
						</div>
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
									<label>Specifications</label>
								</div>
								<div className="detail">
									<label>Price</label>
								</div>
								<div className="detail">
									<label>Comments</label>
								</div>
								<div className="detail">
									<label>Terms</label>
								</div>
								<div className="detail">
									<label>Delivery</label>
								</div>
							</div>
							{orders}
						</div>
						<label className="title">Contact</label>
						<div className="contact">
							<div className="detail">
								<label>Phone</label>
							</div>
							<div className="detail">
								<label>Email</label>
							</div>
							<div className="detail">
								<label>Skype</label>
							</div>
						</div>
					</div>;
	};
	return (
		<div className="supplier">
		  	<div className="attributes" onClick={handleSubmit.bind(this, index)}>
				<div className="attribute">
				  <p>{quote.name}</p>
				</div>
				<div className="attribute multiple">
				  {prices}
				</div>
				<div className="attribute multiple">
				  {terms}
				</div>
				<div className="attribute multiple">
				  {delivery}
				</div>
				<div className="attribute multiple">
				  <p>{quote.expiration}</p>
				</div>
				<div className="request-button">
				  <button onClick={handleSubmit.bind(this, index)}>Full Details</button>
				</div>
			</div>
			{details}
		</div>
	);
  }
}
