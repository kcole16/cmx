import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Link } from 'react-router'
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
                      <div className="main-bar">
                        <Link className="nav-link" to="quoteSpecifics" activeClassName="active">Create Enquiry</Link>
                        <Link className="nav-link" to="suppliers" activeClassName="active">Select Suppliers</Link>
                        <Link className="nav-link" to="viewQuotes" activeClassName="active">View Quotes</Link>
                      </div>
                      <div className="main-app-container">
                        {this.props.children}
                      </div>
                     </div>;
    };
    return (
          <div className="container">
            <div className="navbar">
              <img src={Logo} />
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
