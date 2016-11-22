import React, { Component } from 'react';

export default class RecapEmail extends Component {
  render() {
	const {quote, deal, user} = this.props;
	let orderComments = null;
	let orders = null;
	if (quote.orders) {
		orders = quote.orders.map((order, index) => {
			return (
			    <div key={index} className="order">
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
			        <p>{order.delivery}</p>
			      </div>
            <div className="detail">
              <p>{order.physical}</p>
            </div>
			      <div className="detail">
			        <p>{order.price} {deal.currency}</p>
			      </div>
			    </div>
			  );
		});
		orderComments = orders.map((order, index) => {
			return (
			    <p key={index}>{order.grade}</p>
			  )
		});
	};
	const comments = <div className="comments">
	                 {orderComments}
	                 <p>{quote.info}</p>
	               </div>;
	return (
			<div className="email">
                <p>{deal.broker ? <p>deal.broker, acting in accordance with instructions received from</p>: null} {user.companyName}, (hereafter referred to as "Buyers") have placed the following Bunker nomination with {quote.name} (hereafter referred to as "Sellers"):</p>
                <p style={{marginTop: 15}}>This sale is subject to Sellers' General Terms and Conditions which, if not already held by the buyer, are available on
                request to this office.</p>
                <p style={{marginTop: 15}}>Vessel: {deal.vessel}</p>
                <p>Port: {deal.port} {deal.location ? '('+deal.location+')' : null}</p>
                <p>ETA: {deal.eta}</p>
                <div className="order" style={{marginTop: 15}}>
                  <div className="detail">
                    <p>Grade:</p>
                  </div>
                  <div className="detail">
                    <p>Quantity:</p>
                  </div>
                  <div className="detail">
                    <p>Specification:</p>
                  </div>
                  <div className="detail">
                    <p>Payment Terms:</p>
                  </div>
                  <div className="detail">
                    <p>Delivery:</p>
                  </div>
                  <div className="detail">
                    <p>Physical:</p>
                  </div>
                  <div className="detail">
                    <p>Price:</p>
                  </div>
                </div>
                {orders}
                <p style={{marginTop: 15}}>Agent: {deal.agent ? deal.agent : 'TBC'}</p>
                <p style={{marginTop: 15}}>Add Remarks:</p>
                {comments}
                <p style={{marginTop: 15}}>Remarks:</p>
                <p>Fuels shall be a blend of hydrocarbons derived from petroleum refining.</p>
                <p>This shall not preclude small amounts of additives intended to improve some aspects of performance.</p>
                <p>The fuels shall be free of inorganic acids and should not include any added substance or chemical waste which:</p>
                <p>·         jeopardizes the safety of ships or</p>
                <p>·         adversely affects performance of machinery or</p>
                <p>·         is harmful to personnel or</p>
                <p>·         contributes overall to additional air pollution</p>
                <p style={{marginTop: 15}}>Please advise immediately if you feel any of the above terms are incorrect.</p>
                <p style={{marginTop: 15}}>Best Regards,</p>
                <p style={{marginTop: 15}}>John Smith</p>
                <p>OilFront Services</p>
                <p>Tel: +44 5555555555</p>
                <p>Mob: +44 555555555</p>
                <p>Email: info@oilfront.com</p>
                <p>Skype: oilfront</p>
                <p><a href="www.oilfront.com">www.oilfront.com</a></p> 
            </div>
	);
  }
}
