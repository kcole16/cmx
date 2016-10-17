import React, { Component } from 'react';
import OrderSummary from './OrderSummary';

export default class DealSummary extends Component {
  render() {
    const {deal, title} = this.props;
    const orders = deal.orders.map(function(order, index) {
      return (
          <OrderSummary key={index} order={order} />
        )
    });
    return (
      <div className="deal-summary">
        <label className="title">{title}</label>
        <label className="descriptor">Deal Specifics</label>
        <div className="attributes">
          <div className="attribute">
            <label>Port</label>
            <p>{deal.port}</p>
          </div>
          <div className="attribute">
            <label>Vessel</label>
            <p>{deal.vessel}</p>
          </div>
          <div className="attribute">
            <label>ETA</label>
            <p>{deal.eta}</p>
          </div>
          <div className="attribute">
            <label>ETD</label>
            <p>{deal.etd}</p>
          </div>
        </div>
        <label className="descriptor" style={{marginBottom: 0}}>Orders</label>
        <div className="titles">
          <div className="title">
            <label>Quality</label>
          </div>
          <div className="title">
            <label>Spec</label>
          </div>
          <div className="title">
            <label>Max Sulphur</label>
          </div>
          <div className="title">
            <label>Quantity</label>
          </div>
          <div className="title">
            <label>Unit</label>
          </div>
        </div>
        <div className="orders">
          {orders}
        </div>
      </div>
    );
  }
}
