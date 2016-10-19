require('../styles/login.scss');
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import {getValues} from 'redux-form';
import LoginForm from '../components/LoginForm';

class Login extends Component {
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
    return (
      <div className="login-container">
        <LoginForm 
          onSubmit={this.handleSubmit} />
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
)(Login);
