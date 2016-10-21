import React, { Component } from 'react';

export default class OrderSummary extends Component {
  render() {
    const {order} = this.props;
    return (
      <div className="order" style={{marginBottom: 10}}>
        <div className="order-attribute">
          <p>{order.grade}</p>
        </div>
        <div className="order-attribute">
          <p>{order.quantity}</p>
        </div>
        <div className="order-attribute">
          <p>{order.unit}</p>
        </div>
        <div className="order-attribute">
          <p>{order.specification}</p>
        </div>
        <div className="order-attribute">
          <p>{order.comments}</p>
        </div>
      </div>
    );
  }
}
