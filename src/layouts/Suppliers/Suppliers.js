require('../../styles/suppliers.scss');

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {reduxForm, getValues} from 'redux-form';
import Supplier from './components/Supplier';

class Suppliers extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleSubmit() {
    const {state, actions} = this.props;
    const form = getValues(state.form.login);
    actions.fetchLogin(form);
  }

  handleCheck(value) {
    // const {state, actions} = this.props;
    // const form = getValues(state.form.login);
    // actions.fetchLogin(form);
  }

  render() {
    const supplierList = [{
      name: 'Supplier A'
    },{
      name: 'Supplier B'
    }];
    const portList = [{
      name: 'Singapore',
      id: 7
    },{
      name: 'Lagos',
      id: 8
    },{
      name: 'Lome',
      id: 9
    }];
    const handleCheck = this.handleCheck;
    const suppliers = supplierList.map(function(supplier) {
      return (
            <Supplier key={supplier.name} supplier={supplier} handleCheck={handleCheck} />
        );
    });
    const ports = portList.map(function(port) {
      return (
            <option id={port.id} value={port.id}>{port.name}</option>
        );
    });
    return (
      <div className="layout-container">
        <div className="port-select">
          <label>Select Port</label>
          <select className="styled-select">
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
        <div className="suppliers">
          {suppliers}
        </div>
        <div className="request-button">
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
