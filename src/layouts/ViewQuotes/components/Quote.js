require('../../../styles/viewQuotes.scss');

import React, { Component } from 'react';

export default class Quote extends Component {
  render() {
  	const {supplier, handleSubmit} = this.props;
    return (
	      <div className="supplier">
	        <div className="attribute">
	          <p>{supplier.name}</p>
	        </div>
	        <div className="attribute">
	          <p>{supplier.price}</p>
	        </div>
	        <div className="attribute">
	          <p>{supplier.dates}</p>
	        </div>
	        <div className="attribute">
	          <p>{supplier.terms}</p>
	        </div>
	        <div className="attribute">
	          <p>{supplier.expiration}</p>
	        </div>
	        <div className="request-button">
	          <button onClick={handleSubmit}>Accept Quote</button>
	        </div>
	      </div>
    );
  }
}
