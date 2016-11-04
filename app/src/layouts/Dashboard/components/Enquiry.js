import React, { Component } from 'react';

export default class Enquiry extends Component {
  render() {
	const {vessel, port, eta, orders} = this.props;
	const grades = orders.map((order, index) => {
		return (
				<p key={index}>{order.grade}</p>
			)
	});
	return (
		<div className="enquiry">
			<div className="attribute">
				<p>{vessel}</p>
			</div>
			<div className="attribute">
				<p>{port}</p>
			</div>
			<div className="attribute">
				<p>{eta}</p>
			</div>
			<div className="attribute grades">
				{grades}
			</div>
			<div className="attribute">
				<button>OPEN</button>
			</div>
		</div>
	);
  }
}
