import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Link } from 'react-router'
import Login from '../containers/Login';
import Suppliers from '../layouts/Suppliers/Suppliers';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {state} = this.props;

    // let content = <Login />;
    
    // if (state.user.user_id) {
    // let content = <div style={{ marginTop: '1.5em' }}>{this.props.children}</div>;
    let content = <Suppliers />;
    // };
    return (
          <div className="container">
            <div className="navbar">
            </div>
            <div className="main-bar">
              <Link className="nav-link" to="suppliers" activeClassName="active">Port & Suppliers</Link>
              <Link className="nav-link" to="quoteSpecifics" activeClassName="active">Quote Specifics</Link>
              <Link className="nav-link" to="viewQuotes" activeClassName="active">View Quotes</Link>
            </div>
            <div className="main-app-container">
              {this.props.children}
            </div>
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
