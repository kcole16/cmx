import React, { Component } from 'react';
import {reduxForm, getValues} from 'redux-form';

const fields = ['email','password'];
class LoginForm extends Component {
  render() {
    const {fields: {email, password}, handleSubmit} = this.props;
    return (
      <div className="login">
        <form onSubmit={handleSubmit}>
          <div className="login-name">
            <div className="login-label">
              <label>Email</label>
            </div>
            <input type="text" className="create-input" {...email}/>
          </div>
          <div className="login-name">
            <div className="login-label">
              <label>Password</label>
            </div>
            <input type="password" className="create-input" {...password}/>
          </div>
          <div className="request-button">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm = reduxForm({ 
  form: 'login',                       
  fields
})(LoginForm);
