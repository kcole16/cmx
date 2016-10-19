require('../../../styles/viewQuotes.scss');

import React, { Component } from 'react';

export default class Quote extends Component {
  render() {
  	const {supplier, handleSubmit, eta, etd} = this.props;
    return (
	      <div className="supplier">
	        <div className="attribute">
	          <p>{supplier.name}</p>
	        </div>
	        <div className="attribute">
	          <p>{supplier.price}</p>
	        </div>
	        <div className="attribute">
	          <p>{eta} - {etd}</p>
	        </div>
	        <div className="attribute">
	          <p>{supplier.terms}</p>
	        </div>
	        <div className="attribute">
	          <p>{supplier.expiration}</p>
	        </div>
	        <div className="request-button">
	          <button onClick={handleSubmit}>Full Details</button>
	        </div>
	      </div>
    );
  }
}
