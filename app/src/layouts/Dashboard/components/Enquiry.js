import React, { Component } from 'react';

export default class Enquiry extends Component {
  render() {
	const {deal, handleClick} = this.props;
	const grades = deal.orders.map((order, index) => {
		return (
				<p key={index}>{order.grade}</p>
			)
	});
	return (
		<div className="enquiry">
			<div className="attribute">
				<p>{deal.vessel}</p>
			</div>
			<div className="attribute">
				<p>{deal.port}</p>
			</div>
			<div className="attribute">
				<p>{deal.eta}</p>
			</div>
			<div className="attribute grades">
				{grades}
			</div>
			{ handleClick ? 
			<div className="attribute">
				<button onClick={handleClick.bind(this, deal)}>OPEN</button>
			</div> : null }
		</div>
	);
  }
}
