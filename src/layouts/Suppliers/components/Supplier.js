require('../../../styles/suppliers.scss');

import React, { Component } from 'react';

export default class Supplier extends Component {
  render() {
  	const {supplier} = this.props;
    return (
	      <div className="supplier">
	        <div className="item">
	          <p>{supplier.name}</p>
	        </div>
	        <div className="item">
           	  <input type="checkbox" />
	        </div>
	      </div>
    );
  }
}
