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
    const {state, actions} = this.props;
    let content = <Login />;
    if (state.user.isAuthenticated) {
      content =  <div>
                    {this.props.children}
                 </div>;
    };
    return (
          <div className="container">
            <div className="navbar">
              <img src={Logo} onClick={() => {browserHistory.push('/app')}}/>
              {state.user.isAuthenticated ? 
                <div className="menu">
                  <p onClick={() => {browserHistory.push('/app')}}>Home</p>
                  <p>Reports</p>
                  <p>Directory</p>
                  <p>Claims</p>
                  <p onClick={actions.logout}>Logout</p>
                </div> : null}
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
