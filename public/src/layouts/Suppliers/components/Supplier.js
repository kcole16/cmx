require('../../../styles/suppliers.scss');

import React, { Component } from 'react';

export default class Supplier extends Component {
  render() {
  	const {supplier, handleCheck} = this.props;
    return (
	      <div className="supplier">
	        <div className="item">
	          <p>{supplier.name}</p>
	        </div>
	        <div className="item">
           	  <input type="checkbox" value={supplier.name} onChange={handleCheck}/>
	        </div>
	      </div>
    );
  }
}
