require('../../styles/suppliers.scss');

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { browserHistory } from 'react-router'
import Supplier from './components/Supplier';

class Suppliers extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.selectPort = this.selectPort.bind(this);
  }

  componentWillMount() {
    const {state, actions} = this.props;
    actions.fetchGetSuppliers(state.deals.deal.port);
  }

  handleSubmit() {
    browserHistory.push('quoteSpecifics');
  }

  handleCheck(event) {
    const {state, actions} = this.props;
    actions.addSupplier(event.target.value);
  }

  selectPort(event) {
    const {actions} = this.props;
    actions.fetchGetSuppliers(event.target.value);
  }

  render() {
    const {state} = this.props;
    const portList = [{
      name: 'Singapore',
      id: 7
    },{
      name: 'Rotterdam',
      id: 8
    }];
    let supplierList = state.deals.suppliers;
    if (supplierList === undefined) {
      supplierList = [];
    };
    const handleCheck = this.handleCheck;
    const suppliers = supplierList.map(function(supplier, index) {
      return (
            <Supplier key={index} supplier={supplier} handleCheck={handleCheck}/>
        );
    });
    const ports = portList.map(function(port, index) {
      return (
            <option key={index} id={port.id} value={port.name}>{port.name}</option>
        );
    });
    return (
      <div className="layout-container">
        <div className="port-select">
          <label>Select Port</label>
          <select className="styled-select" onChange={this.selectPort} value={state.deals.deal.port}>
            {ports}
          </select>
        </div>
        <div className="titles">
          <div className="title">
            <label>Company</label>
          </div>
          <div className="title">
            <label>Select</label>
          </div>
        </div>
        <div className="suppliers-select">
          {suppliers}
        </div>
        <div className="request-button" id="suppliers">
          <button onClick={this.handleSubmit}>Request Quotes</button>
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
)(Suppliers);
