require('../../../styles/suppliers.scss');

import React, { Component } from 'react';
import Logo from '../../../assets/img/internet.png'

export default class Supplier extends Component {
  render() {
  	const {supplier, handleCheck, background} = this.props;
    return (
	      <div className="supplier" style={{backgroundColor: background}}>
	        <div className="item" id="logo">
	        	<div className="logo-row">
					<img src={Logo} style={{width: 30, height: 30, color:'red', marginRight: 10}}/>
					<p>{supplier.name}</p>
				</div>
	        </div>
	        <div className="item">
				<p>{supplier.email.split(',')[0]}</p>
	        </div>
	        <div className="item">
           	  <input type="checkbox" value={supplier.name} onChange={handleCheck}/>
	        </div>
	      </div>
    );
  }
}
