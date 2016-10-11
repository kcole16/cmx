import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import {reduxForm, getValues} from 'redux-form';

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
    const {fields: {email, password}} = this.props;
    return (
      <div className="login-container">
        <div className="header">
          <label>LOGIN</label>
        </div>
        <div className="login">
          <div className="login-name">
            <div className="login-label">
              <label>Email:</label>
            </div>
            <input type="text" className="create-input" {...email}/>
          </div>
          <div className="login-name">
            <div className="login-label">
              <label>Password:</label>
            </div>
            <input type="password" className="create-input" {...password}/>
          </div>
          <div className="login-button">
            <button onClick={this.handleSubmit}>Login</button>
          </div>
        </div>
      </div>
    );
  }
}

Login = reduxForm({ 
  form: 'login',                       
  fields: ['email','password']}
)(Login);

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
