import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

export default class Order extends Component {
  render() {
	const {order, editOrder, editDate} = this.props;
	return (
		<div className="info-container">
          <div className="title">
            <label>{order.grade}</label>
          </div>
	      <div className="row">
	        <div className="attribute">
	          <label>Specs</label>
	          <p>{order.spec}</p>
	        </div>
	        <div className="attribute">
	          <label>Volume Ordered</label>
	          <p>{order.quantity}</p>
	        </div>
	        <div className="attribute">
	          <label>Purchased Price</label>
	          <p>{order.price}</p>
	        </div>
	        <div className="attribute">
	          <label>Physical</label>
	          <p>{order.physical}</p>
	        </div>
	      </div>
	      <div className="row">
	        <div className="attribute">
	          <label>Date of Delivery</label>
              <DatePicker
                      selected={order.deliveryDate}
                      onChange={editDate.bind(this, order.grade)} 
                      className="create-input" />
	        </div>
	        <div className="attribute">
	          <label>Volume Delivered (MT)</label>
	          <input className="create-input" type="number" step="any" name={'volumeDelivered'+'+'+order.grade} value={order.volumeDelivered} onChange={editOrder}/>
	        </div>
	        <div className="attribute">
	          <label>Declared Density</label>
	          <input className="create-input" type="number" step="any" name={'declaredDensity'+'+'+order.grade} value={order.declaredDensity} onChange={editOrder}/>
	        </div>
	        <div className="attribute">
	          <label>Sulphur Content %</label>
	          <input className="create-input" type="number" step="any" name={'sulphurContent'+'+'+order.grade} value={order.sulphurContent} onChange={editOrder}/>
	        </div>
	      </div>
		</div>
	);
  }
}
