import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { browserHistory } from 'react-router'
import Suppliers from '../layouts/Suppliers/Suppliers';
import Logo from '../assets/img/main-logo.png';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {state} = this.props;
    let content = <Login />;
    if (state.user.isAuthenticated) {
      content =  <div>
                    {this.props.children}
                 </div>;
    };
    return (
          <div className="container">
            <div className="navbar">
              <img src={Logo} onClick={() => {browserHistory.push('/')}}/>
              <div className="menu">
                <p onClick={() => {browserHistory.push('/')}}>Home</p>
                <p>Reports</p>
                <p>Directory</p>
                <p>Claims</p>
                <p>Account</p>
              </div>
            </div>
            {content}
          </div>
      )
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
)(App);
