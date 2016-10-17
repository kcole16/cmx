import React, { Component } from 'react';

export default class OrderSummary extends Component {
  render() {
    const {order} = this.props;
    return (
      <div className="order">
        <div className="order-attribute">
          <p>{order.quality}</p>
        </div>
        <div className="order-attribute">
          <p>{order.spec}</p>
        </div>
        <div className="order-attribute">
          <p>{order.maxSulphur}</p>
        </div>
        <div className="order-attribute">
          <p>{order.quantity}</p>
        </div>
        <div className="order-attribute">
          <p>{order.unit}</p>
        </div>
      </div>
    );
  }
}
