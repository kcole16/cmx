import React, { Component } from 'react';

export default class Order extends Component {
  render() {
  	const {supplier} = this.props;
    return (
          <div className="order">
          	<div className="detail">
            	<input className="create-input" />
            </div>
          	<div className="detail">
            	<input className="create-input" />
            </div>
          	<div className="detail">
            	<input className="create-input" />
            </div>
          	<div className="detail">
            	<input className="create-input" />
            </div>
          	<div className="detail">
            	<input className="create-input" />
            </div>
          </div>
    );
  }
}
