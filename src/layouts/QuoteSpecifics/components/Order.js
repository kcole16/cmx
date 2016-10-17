import React, { Component } from 'react';
import {reduxForm, getValues} from 'redux-form';

export default class Order extends Component {
  render() {
    const {quality, spec, maxSulphur, quantity, unit} = this.props;
    return (
          <div className="order">
          	<div className="detail">
            	<input className="create-input" field={quality}/>
            </div>
          	<div className="detail">
            	<input className="create-input" field={spec}/>
            </div>
          	<div className="detail">
            	<input className="create-input" field={maxSulphur}/>
            </div>
          	<div className="detail">
            	<input className="create-input" field={quantity}/>
            </div>
          	<div className="detail">
            	<input className="create-input" field={unit}/>
            </div>
          </div>
    );
  }
}