require('../../styles/actualize.scss');

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {reduxForm, getValues} from 'redux-form';
import { browserHistory } from 'react-router';
import Order from './components/Order';
import Review from './components/Review';

class Actualize extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {state, actions} = this.props;
  }

  render() {
    const {state, actions} = this.props;
    const active = state.deals.active.deal;
    return (
      <div>
        <div className="main-bar">
          <div className="title">
            <label>Actualize Deal</label>
            <label>{active.vessel} / {active.port} / {active.eta} / {active.orders[0].grade}</label>
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
                  <label>Vessel</label>
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
                  <p>Seller A</p>
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
                  <label>IMO</label>
                  <p>{active.imo}</p>
                </div>
                <div className="attribute">
                  <label>Voyage No.</label>
                  <p>123123</p>
                </div>
              </div>
            </div>
            <Order order={state.deals.active.deal.orders[0]} />
            <Review />
          </div>
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
