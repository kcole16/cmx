require('../../styles/viewQuotes.scss');

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {reduxForm, getValues} from 'redux-form';
import Quote from './components/Quote';

class ViewQuotes extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {state, actions} = this.props;
    const form = getValues(state.form.login);
    actions.fetchLogin(form);
  }

  render() {
    const supplierList = [{
      name: 'Supplier A',
      price: '200/500',
      dates: '9/23-9/24',
      terms: '30 days',
      expiration: '20 minutes'
    },{
      name: 'Supplier B',
      price: '200/500',
      dates: '9/23-9/24',
      terms: '30 days',
      expiration: '20 minutes'
    }];
    const handleSubmit = this.handleSubmit;
    const suppliers = supplierList.map(function(supplier) {
      return (
            <Quote key={supplier.name} supplier={supplier} handleSubmit={handleSubmit} />
        );
    });
    return (
      <div className="layout-container">
        <div className="titles">
          <div className="title">
            <label>Company</label>
          </div>
          <div className="title">
            <label>Price</label>
          </div>
          <div className="title">
            <label>Dates</label>
          </div>
          <div className="title">
            <label>Terms</label>
          </div>
          <div className="title">
            <label>Expiration</label>
          </div>
          <div className="title">
          </div>
        </div>
        <div className="suppliers">
          {suppliers}
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
)(ViewQuotes);
