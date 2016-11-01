require('../../../styles/viewQuotes.scss');

import React, { Component } from 'react';

export default class Quote extends Component {
  render() {
	const {index, quote, openModal, eta, etd, isActive, currency} = this.props;
	const skypeLink = "skype:"+quote.skype+"?chat";
	const comments = quote.orders.map((order, index) => {
		return (
				<p key={index}>{order.grade}: {order.comments}</p>
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
	return (
		<div className="supplier">
			<div className="order-details">
				<div className="order-banner">
					<label>{quote.name}</label>
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
				<label className="title">Comments</label>
				<div className="comments">
					{comments}
					<div className="additional-comments">
						<p>{quote.info ? quote.info : null}</p>
					</div>
				</div>
				<label className="title">Contact</label>
				<div className="contact">
					<div className="detail">
						<label>Phone</label>
						<p>{quote.phone}</p>
					</div>
					<div className="detail">
						<label>Email</label>
						<p>{quote.email}</p>
					</div>
					<div className="detail">
						<label>Skype</label>
						<p><a href={skypeLink}>{quote.skype}</a></p>
					</div>
				</div>
				<div className="request-button">
				  <button onClick={openModal.bind(this, quote)}>Select Quote</button>
				</div>
			</div>
		</div>
	);
  }
}
