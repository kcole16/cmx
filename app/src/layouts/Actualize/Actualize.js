require('../../styles/actualize.scss');

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {reduxForm, getValues} from 'redux-form';
import { browserHistory } from 'react-router';
import Order from './components/Order';
import Review from './components/Review';
import DatePicker from 'react-datepicker';

class Actualize extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.editOrder = this.editOrder.bind(this);
    this.editDate = this.editDate.bind(this);
    this.actualizeDeal = this.actualizeDeal.bind(this);
    this.updateReview = this.updateReview.bind(this);
    this.state = {
      positive: false,
      negative: false,
      orders: this.props.state.deals.active.deal.orders,
      ratingReason: null,
      ratingComment: null
    }
  }

  componentDidMount() {
    const {state, actions} = this.props;
    window.scrollTo(0, 0);
  }

  handleSelect(type) {
    if (type === 'positive') {
      this.setState({positive: true, negative: false})
    } else if (type === 'negative') {
      this.setState({negative: true, positive: false})
    }
  }

  editOrder(event) {
    const attr = event.target.name.split('+')[0];
    const grade = event.target.name.split('+')[1];
    const order = this.state.orders.find(x => x.grade === grade);
    const index = this.state.orders.indexOf(order);
    order[attr] = event.target.value;
    const state = this.state;
    state.orders[index] = order;
    this.setState(state);
  }

  editDate(grade, date) {
    const order = this.state.orders.find(x => x.grade === grade);
    const index = this.state.orders.indexOf(order);
    order['deliveryDate'] = date;
    const state = this.state;
    state.orders[index] = order;
    this.setState(state);
  }

  actualizeDeal() {
    const { state, actions } = this.props;
    const orders = this.state.orders;
    orders.map(order => order.deliveryDate = order.deliveryDate.format('YYYY-MM-DD'));
    const deal = state.deals.active.deal;
    deal.ratingComment = this.state.ratingComment;
    deal.ratingReason = this.state.ratingReason;
    actions.fetchActualize(deal, orders);
    browserHistory.push('/app');
  }

  updateReview(event) {
    const name = event.target.name;
    const value = event.target.value;
    const state = this.state;
    state[name] = value;
    this.setState(state);
  }

  render() {
    const {state, actions} = this.props;
    const active = state.deals.active.deal;
    const editOrder = this.editOrder;
    const editDate = this.editDate;
    const orders = state.deals.active.deal.orders.map((order, index) => {
      return (
            <Order key={index} order={order} editOrder={editOrder} editDate={editDate} />
        )
    });
    return (
      <div>
        <div className="main-bar">
          <div className="title">
            <label>Actualize Deal</label>
            <label className="tag">{active.vessel} / {active.port} / {active.eta} / {active.orders[0].grade}</label>
          </div>
        </div>
        <div className="main-app-container">
          <div className="layout-container">
            <div className="info-container">
              <div className="title">
                <label>DETAILS</label>
              </div>
              <div className="row">
                <div className="attribute">
                  <label>Vessel [IMO]</label>
                  <p>{active.vessel}</p>
                </div>
                <div className="attribute">
                  <label>Port</label>
                  <p>{active.port}</p>
                </div>
                <div className="attribute">
                  <label>Stem Date</label>
                  <p>{active.eta}</p>
                </div>
                <div className="attribute">
                </div>
                <div className="attribute">
                </div>
              </div>
              <div className="row">
                <div className="attribute">
                  <label>Counterparty</label>
                  <p>{active.counterparty}</p>
                </div>
                <div className="attribute">
                  <label>Agent</label>
                  <p>{active.agent}</p>
                </div>
                <div className="attribute">
                  <label>Broker</label>
                  <p>{active.broker}</p>
                </div>
                <div className="attribute">
                  <label>Voyage No.</label>
                  <p>123123</p>
                </div>
                <div className="attribute">
                </div>
              </div>
            </div>
            {orders}
            <Review 
              handleSelect={this.handleSelect} 
              positive={this.state.positive} 
              negative={this.state.negative}
              ratingComment={this.state.ratingComment}
              ratingReason={this.state.ratingReason} 
              updateReview={this.updateReview} />
          </div>
        </div>
        <div className="request-button" style={{marginRight: '4%'}}>
          <button style={{width: 250}} onClick={this.actualizeDeal} >Actualize Deal</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Actualize);
